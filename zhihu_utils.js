// ==UserScript==
// @name         禁止知乎自动弹出登录
// @namespace    https://github.com/LiangLouise/TM_Script
// @version      0.0.1
// @description  disable the pop up of zhihu login form
// @author       You
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function delete_adb_banner() {
        const adb_class = '.AdblockBanner';
        let banner = document.querySelector(adb_class);
        if (banner) banner.remove();
    }

    function hide_login_form() {

        let login_button = document.querySelector('.Button.AppHeader-login.Button--blue');
        if (!login_button) return;

        const login_class = ".Modal.Modal--default.signFlowModal";
        const root = document.documentElement;
        const config = {attributes: true};
        
        const mutateCallBack = function(mutationsList, observer) {
            for(let mutation of mutationsList) {
                // When it tries to disable scrollbar
                if (mutation.type === 'attributes' && root.attributes.style) {
                    // Remove the log in form div
                    document.querySelector(login_class).parentElement.parentElement.remove();
                    // Remove the style at root disabling scrollbar
                    root.removeAttribute('style');
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(mutateCallBack);

        let scrollTimer;
        // Start observing the target node for configured mutations while scrolling
        window.addEventListener('scroll', function() {

            observer.observe(root, config);

            if(!scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                observer.disconnect();
            }, 150);
        });
        
        return observer;
    }

    delete_adb_banner();
    hide_login_form();
    
})();