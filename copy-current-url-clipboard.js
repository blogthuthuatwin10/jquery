function copyTextToClipboard(text) {
		var textArea = document.createElement(&quot;textarea&quot;);
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;
		textArea.style.width = '2em';
		textArea.style.height = '2em';
		textArea.style.padding = 0;
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';
		textArea.style.background = 'transparent';
		textArea.value = text;
			document.body.appendChild(textArea);
		textArea.select();
		try {
    		var successful = document.execCommand('copy');
    		var msg = alert(&quot;Đã sao chép liên kết vào khay nhớ tạm!&quot;);
    		
  		} catch (err) {
    		var msg = alert(&quot;Không thể sao chép liên kết!&quot;);
  		}
  		document.body.removeChild(textArea);
	}
	function CopyLink() {
		copyTextToClipboard(location.href);
	}
