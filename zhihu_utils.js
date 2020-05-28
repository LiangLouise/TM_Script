// ==UserScript==
// @name         知乎页面优化
// @namespace    https://github.com/LiangLouise/TM_Script
// @homepageURL  https://github.com/LiangLouise/TM_Script
// @version      0.0.1
// @description  disable the pop up of zhihu login form
// @author       LiangLouise
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
        const config = {childList: true};
        const mutateCallBack = function(mutationsList, observer) {
            for(let mutation of mutationsList) {
                // When it tries to disable scrollbar
                if (mutation.type === 'childList' && document.querySelector(login_class)) {
                    console.log(mutation);
                    // Remove the log in form div
                    document.querySelector(login_class).parentElement.parentElement.remove();
                    // Remove the style at root disabling scrollbar
                    document.documentElement.removeAttribute('style');
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(mutateCallBack);
        observer.observe(document.body, config);
    }


    delete_adb_banner();
    hide_login_form();
    
})();