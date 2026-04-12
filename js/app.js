/* =========================================
   Enterprise Tech PPT Starter App
   16:9 画布缩放与全屏控制
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('viewport');
    const btnFullscreen = document.getElementById('btn-fullscreen');

    if (!viewport) {
        return;
    }

    const TARGET_WIDTH = 1920;
    const TARGET_HEIGHT = 1080;

    function scaleViewport() {
        const scaleX = window.innerWidth / TARGET_WIDTH;
        const scaleY = window.innerHeight / TARGET_HEIGHT;
        const scale = Math.min(scaleX, scaleY);
        const offsetX = Math.max((window.innerWidth - (TARGET_WIDTH * scale)) / 2, 0);
        const offsetY = Math.max((window.innerHeight - (TARGET_HEIGHT * scale)) / 2, 0);

        viewport.style.left = `${offsetX}px`;
        viewport.style.top = `${offsetY}px`;
        viewport.style.transform = `scale(${scale})`;
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`启动全屏失败: ${err.message}`);
            });
            return;
        }

        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    scaleViewport();
    window.addEventListener('resize', () => {
        window.requestAnimationFrame(scaleViewport);
    });

    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', toggleFullScreen);
    }

    const routerSlide = document.querySelector('.slide-router');
    const overviewSlide = document.querySelector('.slide-overview');

    if (routerSlide) {
        setupRouterConnectors(routerSlide);
    }

    if (overviewSlide) {
        setupOverviewConnectors(overviewSlide);
    }

    function setupRouterConnectors(slide) {
        const svg = slide.querySelector('.slide-router__network');
        const center = slide.querySelector('.slide-router__router');
        const leftCard = slide.querySelector('.slide-router__connector-left');
        const rightCards = Array.from(slide.querySelectorAll('.slide-router__connector-right'));

        if (!svg || !center || !leftCard || !rightCards.length) {
            return;
        }

        const NS = 'http://www.w3.org/2000/svg';
        const connectors = [];

        function makeConnector(kind, index) {
            const path = document.createElementNS(NS, 'path');
            path.classList.add('slide-router__network-line');
            path.dataset.kind = kind;

            const particle = document.createElementNS(NS, 'circle');
            particle.classList.add('slide-router__particle');
            particle.setAttribute('r', kind === 'left' ? '4.2' : String(4.2 - Math.min(index, 2) * 0.4));

            const motion = document.createElementNS(NS, 'animateMotion');
            motion.setAttribute('repeatCount', 'indefinite');
            motion.setAttribute('dur', kind === 'left' ? '4.6s' : `${4.2 + (index * 0.28)}s`);
            motion.setAttribute('begin', kind === 'left' ? '-0.8s' : `${-(0.8 + index * 0.55)}s`);
            particle.appendChild(motion);

            const endpoint = document.createElementNS(NS, 'circle');
            endpoint.classList.add('slide-router__connector-end');
            endpoint.setAttribute('r', kind === 'left' ? '4.4' : '5.2');

            connectors.push({ path, particle, motion, endpoint, kind, index });
            svg.append(path, particle, endpoint);
        }

        makeConnector('left', 0);
        rightCards.forEach((_, index) => makeConnector('right', index));

        function toSvgPoint(rect, svgRect, x, y) {
            return {
                x: x - svgRect.left,
                y: y - svgRect.top,
            };
        }

        function bezierPath(start, end, bias = 0.42) {
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const cp1 = {
                x: start.x + dx * bias,
                y: start.y + dy * 0.05,
            };
            const cp2 = {
                x: end.x - dx * bias,
                y: end.y - dy * 0.05,
            };
            return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
        }

        function updateConnector(connector, d, endPoint) {
            connector.path.setAttribute('d', d);
            connector.motion.setAttribute('path', d);
            connector.endpoint.setAttribute('cx', String(endPoint.x));
            connector.endpoint.setAttribute('cy', String(endPoint.y));
        }

        function render() {
            const svgRect = svg.getBoundingClientRect();
            const centerRect = center.getBoundingClientRect();
            const leftRect = leftCard.getBoundingClientRect();

            const centerLeft = toSvgPoint(
                centerRect,
                svgRect,
                centerRect.left,
                centerRect.top + centerRect.height * 0.5,
            );
            const centerRight = toSvgPoint(
                centerRect,
                svgRect,
                centerRect.right,
                centerRect.top + centerRect.height * 0.5,
            );
            const leftStart = toSvgPoint(
                leftRect,
                svgRect,
                leftRect.right,
                leftRect.top + leftRect.height * 0.5,
            );

            updateConnector(connectors[0], bezierPath(leftStart, centerLeft, 0.34), centerLeft);

            rightCards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const laneOffset = (index - 1.5) * 26;
                const start = toSvgPoint(
                    cardRect,
                    svgRect,
                    centerRect.right,
                    centerRect.top + centerRect.height * 0.5 + laneOffset,
                );
                const end = toSvgPoint(
                    cardRect,
                    svgRect,
                    cardRect.left + 8,
                    cardRect.top + cardRect.height * 0.5,
                );
                updateConnector(connectors[index + 1], bezierPath(start, end, 0.38), end);
            });
        }

        let rafId = 0;
        function scheduleRender() {
            window.cancelAnimationFrame(rafId);
            rafId = window.requestAnimationFrame(render);
        }

        scheduleRender();
        window.addEventListener('resize', scheduleRender);
        window.addEventListener('load', scheduleRender);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(scheduleRender).catch(() => {});
        }
    }

    function setupOverviewConnectors(slide) {
        const svg = slide.querySelector('.slide-overview__network');
        const center = slide.querySelector('.slide-overview__gateway');
        const targets = Array.from(slide.querySelectorAll('.slide-overview__side-card, .slide-overview__supply-panel'));

        if (!svg || !center || !targets.length) {
            return;
        }

        const NS = 'http://www.w3.org/2000/svg';
        const connectors = [];

        function makeConnector(index) {
            const path = document.createElementNS(NS, 'path');
            path.classList.add('slide-overview__network-line');

            const particle = document.createElementNS(NS, 'circle');
            particle.classList.add('slide-overview__flow-orb');
            particle.setAttribute('r', '5.5');

            const motion = document.createElementNS(NS, 'animateMotion');
            motion.setAttribute('repeatCount', 'indefinite');
            motion.setAttribute('dur', `${4.8 + (index % 3) * 0.35}s`);
            motion.setAttribute('begin', `${-(0.7 + index * 0.42)}s`);
            particle.appendChild(motion);

            const endpoint = document.createElementNS(NS, 'circle');
            endpoint.classList.add('slide-overview__flow-orb');
            endpoint.setAttribute('r', '4.2');

            connectors.push({ path, particle, motion, endpoint, index });
            svg.append(path, particle, endpoint);
        }

        targets.forEach((_, index) => makeConnector(index));

        function toSvgPoint(svgRect, x, y) {
            return {
                x: x - svgRect.left,
                y: y - svgRect.top,
            };
        }

        function edgePoint(rect, target, inset) {
            const width = Math.max(rect.width - inset * 2, 1);
            const height = Math.max(rect.height - inset * 2, 1);
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = target.x - centerX;
            const dy = target.y - centerY;
            const scale = 1 / Math.max(Math.abs(dx) / (width / 2), Math.abs(dy) / (height / 2), 1);

            return {
                x: centerX + dx * scale,
                y: centerY + dy * scale,
            };
        }

        function circleEdgePoint(rect, target, inset) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = target.x - centerX;
            const dy = target.y - centerY;
            const distance = Math.max(Math.hypot(dx, dy), 1);
            const radius = Math.max((Math.min(rect.width, rect.height) / 2) - inset, 1);

            return {
                x: centerX + (dx / distance) * radius,
                y: centerY + (dy / distance) * radius,
            };
        }

        function buildCurve(start, end, laneOffset) {
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const bend = Math.min(Math.abs(dx) * 0.36, 180);

            const cp1 = {
                x: start.x + dx * 0.34,
                y: start.y + dy * 0.08 + laneOffset,
            };
            const cp2 = {
                x: end.x - dx * 0.34,
                y: end.y - dy * 0.08 - laneOffset,
            };

            if (Math.abs(dx) > 60) {
                cp1.x = start.x + Math.sign(dx) * bend;
                cp2.x = end.x - Math.sign(dx) * bend;
            }

            return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
        }

        function updateConnector(connector, d, endPoint) {
            connector.path.setAttribute('d', d);
            connector.motion.setAttribute('path', d);
            connector.endpoint.setAttribute('cx', String(endPoint.x));
            connector.endpoint.setAttribute('cy', String(endPoint.y));
        }

        function render() {
            const svgRect = svg.getBoundingClientRect();
            const centerRect = center.getBoundingClientRect();
            const centerPoint = {
                x: centerRect.left + centerRect.width / 2,
                y: centerRect.top + centerRect.height / 2,
            };

            targets.forEach((target, index) => {
                const cardRect = target.getBoundingClientRect();
                const cardPoint = {
                    x: cardRect.left + cardRect.width / 2,
                    y: cardRect.top + cardRect.height / 2,
                };
                const isLeftSide = cardPoint.x < centerPoint.x;
                const start = circleEdgePoint(centerRect, cardPoint, 12);
                const end = edgePoint(cardRect, centerPoint, 10);
                const laneOffset = (index - (targets.length - 1) / 2) * 8 * (isLeftSide ? 1 : -1);

                updateConnector(
                    connectors[index],
                    buildCurve(
                        toSvgPoint(svgRect, start.x, start.y),
                        toSvgPoint(svgRect, end.x, end.y),
                        laneOffset,
                    ),
                    toSvgPoint(svgRect, end.x, end.y),
                );
            });
        }

        let rafId = 0;
        function scheduleRender() {
            window.cancelAnimationFrame(rafId);
            rafId = window.requestAnimationFrame(render);
        }

        scheduleRender();
        window.addEventListener('resize', scheduleRender);
        window.addEventListener('load', scheduleRender);

        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(scheduleRender);
            resizeObserver.observe(slide);
        }

        const slideStateObserver = new MutationObserver((mutations) => {
            if (mutations.some((mutation) => mutation.attributeName === 'class')) {
                scheduleRender();
            }
        });
        slideStateObserver.observe(slide, { attributes: true, attributeFilter: ['class'] });

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(scheduleRender).catch(() => {});
        }
    }
});
