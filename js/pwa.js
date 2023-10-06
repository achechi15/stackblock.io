window.addEventListener("load", () => {
    console.log("PWA ready!");
    let activeDownload = localStorage.getItem("PWA_installed");
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        console.log("Prepared");

        if(activeDownload || activeDownload == 'true') {
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
            });
        } else {
            console.log('Installed before')
        }
    });

    window.addEventListener('appinstalled', (event) => {
        deferredPrompt = null;
        console.log('👍', 'appinstalled', event);
        localStorage.setItem("PWA_installed", 'true');
    });
});