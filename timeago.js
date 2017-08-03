/*<![CDATA[*/
(function (factory) {
  if (typeof define === &#39;function&#39; &amp;&amp; define.amd) {
    // AMD. Register as an anonymous module.
    define([&#39;jquery&#39;], factory);
  } else if (typeof module === &#39;object&#39; &amp;&amp; typeof module.exports === &#39;object&#39;) {
    factory(require(&#39;jquery&#39;));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === &quot;string&quot;) {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === &quot;number&quot;) {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowPast: true,
      allowFuture: false,
      localeTitle: false,
      cutoff: 0,
      autoDispose: true,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: &quot;trước&quot;,
        suffixFromNow: &quot;Vừa đăng&quot;,
        inPast: &#39;bất kỳ lúc nào&#39;,
        seconds: &quot;ít hơn một phút&quot;,
        minute: &quot;một phút&quot;,
        minutes: &quot;%d phút&quot;,
        hour: &quot;một giờ&quot;,
        hours: &quot;%d giờ&quot;,
        day: &quot;Hôm qua&quot;,
        days: &quot;%d ngày&quot;,
        month: &quot;một tháng&quot;,
        months: &quot;%d tháng&quot;,
        year: &quot;một năm&quot;,
        years: &quot;%d năm&quot;,
        wordSeparator: &quot; &quot;,
        numbers: []
      }
    },

    inWords: function(distanceMillis) {
      if (!this.settings.allowPast &amp;&amp; ! this.settings.allowFuture) {
          throw &#39;timeago allowPast and allowFuture settings can not both be set to false.&#39;;
      }

      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis &lt; 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      if (!this.settings.allowPast &amp;&amp; distanceMillis &gt;= 0) {
        return this.settings.strings.inPast;
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers &amp;&amp; $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds &lt; 45 &amp;&amp; substitute($l.seconds, Math.round(seconds)) ||
        seconds &lt; 90 &amp;&amp; substitute($l.minute, 1) ||
        minutes &lt; 45 &amp;&amp; substitute($l.minutes, Math.round(minutes)) ||
        minutes &lt; 90 &amp;&amp; substitute($l.hour, 1) ||
        hours &lt; 24 &amp;&amp; substitute($l.hours, Math.round(hours)) ||
          hours &lt; 42 &amp;&amp; substitute($l.day, 1) ||
        days &lt; 30 &amp;&amp; substitute($l.days, Math.round(days)) ||
        days &lt; 45 &amp;&amp; substitute($l.month, 1) ||
        days &lt; 365 &amp;&amp; substitute($l.months, Math.round(days / 30)) ||
        years &lt; 1.5 &amp;&amp; substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || &quot;&quot;;
      if ($l.wordSeparator === undefined) { separator = &quot; &quot;; }
      return $.trim([prefix, words, suffix].join(separator));
    },

    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,&quot;&quot;); // remove milliseconds
      s = s.replace(/-/,&quot;/&quot;).replace(/-/,&quot;/&quot;);
      s = s.replace(/T/,&quot; &quot;).replace(/Z/,&quot; UTC&quot;);
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/,&quot; $1$2&quot;); // -04:00 -&gt; -0400
      s = s.replace(/([\+\-]\d\d)$/,&quot; $100&quot;); // +09 -&gt; +0900
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr(&quot;datetime&quot;) : $(elem).attr(&quot;title&quot;);
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery&#39;s `is()` doesn&#39;t play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === &quot;time&quot;; // $(elem).is(&quot;time&quot;);
    }
  });

  // functions that can be called via $(el).timeago(&#39;action&#39;)
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function() {
      functions.dispose.call(this);
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis &gt; 0) {
        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(timestamp) {
      var date = (timestamp instanceof Date) ? timestamp : $t.parse(timestamp);
      $(this).data(&#39;timeago&#39;, { datetime: date });
      if ($t.settings.localeTitle) {
        $(this).attr(&quot;title&quot;, date.toLocaleString());
      }
      refresh.apply(this);
    },
    updateFromDOM: function() {
      $(this).data(&#39;timeago&#39;, { datetime: $t.parse( $t.isTime(this) ? $(this).attr(&quot;datetime&quot;) : $(this).attr(&quot;title&quot;) ) });
      refresh.apply(this);
    },
    dispose: function () {
      if (this._timeagoInterval) {
        window.clearInterval(this._timeagoInterval);
        this._timeagoInterval = null;
      }
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if (!fn) {
      throw new Error(&quot;Unknown function name &#39;&quot;+ action +&quot;&#39; for timeago&quot;);
    }
    // each over objects here and call the requested function
    this.each(function() {
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var $s = $t.settings;

    //check if it&#39;s still visible
    if ($s.autoDispose &amp;&amp; !$.contains(document.documentElement,this)) {
      //stop if it has been removed
      $(this).timeago(&quot;dispose&quot;);
      return this;
    }

    var data = prepareData(this);

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff === 0 || Math.abs(distance(data.datetime)) &lt; $s.cutoff) {
        $(this).text(inWords(data.datetime));
      } else {
        if ($(this).attr(&#39;title&#39;).length &gt; 0) {
            $(this).text($(this).attr(&#39;title&#39;));
        }
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data(&quot;timeago&quot;)) {
      element.data(&quot;timeago&quot;, { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr(&quot;title&quot;, element.data(&#39;timeago&#39;).datetime.toLocaleString());
      } else if (text.length &gt; 0 &amp;&amp; !($t.isTime(element) &amp;&amp; element.attr(&quot;title&quot;))) {
        element.attr(&quot;title&quot;, text);
      }
    }
    return element.data(&quot;timeago&quot;);
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement(&quot;abbr&quot;);
  document.createElement(&quot;time&quot;);
}));
/*]]>*/