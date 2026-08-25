"use client";

import { useEffect } from 'react';

export function TidioPositionAdjuster() {
    useEffect(() => {
        let isAdjusting = false;

        const adjustTidio = () => {
            if (isAdjusting) return;
            isAdjusting = true;

            try {
                const elements = document.querySelectorAll<HTMLElement>(
                    '#tidio-chat-iframe, #tidio-chat, #tidio-chat iframe, iframe[id*="tidio"], div[id*="tidio"]'
                );

                elements.forEach(el => {
                    if (el.style.bottom !== '60px') {
                        el.style.setProperty('bottom', '60px', 'important');
                    }
                    if (el.style.marginBottom !== '0px') {
                        el.style.setProperty('margin-bottom', '0px', 'important');
                    }
                });
            } finally {
                isAdjusting = false;
            }
        };

        // Initial calls
        adjustTidio();
        const t1 = setTimeout(adjustTidio, 500);
        const t2 = setTimeout(adjustTidio, 1500);
        const t3 = setTimeout(adjustTidio, 3000);

        // Interval poll for initial 15s to catch late loads
        const interval = setInterval(adjustTidio, 800);
        const intervalCleanup = setTimeout(() => clearInterval(interval), 15000);

        // Mutation observer to handle any style updates Tidio does dynamically
        const observer = new MutationObserver((mutations) => {
            let shouldAdjust = false;
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    shouldAdjust = true;
                    break;
                }
                if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
                    const id = mutation.target.id || '';
                    if (id.includes('tidio') && !isAdjusting) {
                        shouldAdjust = true;
                        break;
                    }
                }
            }
            if (shouldAdjust) {
                adjustTidio();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        const onTidioReady = () => {
            adjustTidio();
        };
        document.addEventListener('tidioChat-ready', onTidioReady);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearInterval(interval);
            clearTimeout(intervalCleanup);
            observer.disconnect();
            document.removeEventListener('tidioChat-ready', onTidioReady);
        };
    }, []);

    return null;
}
