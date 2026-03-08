(() => {
	const applyBodyClass = () => {
		document.body.classList.add("cms-modern");
	};

	applyBodyClass();
	const observer = new MutationObserver(applyBodyClass);
	observer.observe(document.documentElement, { childList: true, subtree: true });
})();
