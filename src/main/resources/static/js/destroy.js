let isDestroyed = false;

function destroySite() {
    if (isDestroyed) return;
    isDestroyed = true;

    // Elements we want to make fall
    const targets = document.querySelectorAll(`
        .text-giant span, 
        .pill, 
        .content-panel.open p, 
        .content-panel.open h3, 
        footer div, 
        footer button, 
        nav .group div
    `);

    // Convert to Array and grab bounding rects before we mess with the DOM
    const elementsToFall = [];
    targets.forEach(el => {
        // Skip elements that are hidden or too small
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            elementsToFall.push({ el, rect });
            // Set explicit dimensions so they don't collapse when made absolute
            el.style.width = rect.width + 'px';
            el.style.height = rect.height + 'px';
            el.style.margin = '0';
            el.style.boxSizing = 'border-box';
        }
    });

    // Create full screen canvas for Matter.js mouse interaction
    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();

    // We create a transparent canvas just to capture mouse events easily for Matter.js
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Initially none, change later for mouse
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframes: false
        }
    });
    render.canvas.style.opacity = '0'; // Hide the debug canvas

    // Create boundaries (floor, walls, ceiling)
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth * 2, 60, { isStatic: true });
    const ceiling = Bodies.rectangle(window.innerWidth / 2, -1000, window.innerWidth * 2, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight * 3, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + 30, window.innerHeight / 2, 60, window.innerHeight * 3, { isStatic: true });
    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // Create bodies for elements
    const bodiesMapping = [];
    elementsToFall.forEach(item => {
        const { el, rect } = item;

        // Calculate center for Matter.js
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            restitution: 0.8, // Fun Bounciness
            friction: 0.1,
            density: 0.05
        });

        Composite.add(engine.world, body);

        // Transform the DOM element directly
        // Make it fixed so it stays relative to the viewport just like tracking
        el.style.position = 'fixed';
        el.style.top = '0px';
        el.style.left = '0px';
        el.style.transformOrigin = 'center center';
        el.style.zIndex = '10000'; // above everything

        // Give it an initial translate to prevent jumping before the first tick
        el.style.transform = `translate(${rect.left}px, ${rect.top}px)`;

        bodiesMapping.push({ body, el });
    });

    // Add mouse control so user can throw the elements around
    const mouse = Mouse.create(document.body);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Remove background transitions and change to dark wild theme
    document.body.style.transition = 'background-color 1s ease';
    document.body.style.backgroundColor = '#111';

    // Hide the marquee and un-fun elements
    try {
        document.querySelector('.marquee-container').style.opacity = '0';
        document.querySelector('.marquee-container').style.transition = 'opacity 1s ease';
        document.querySelector('.bike-container').style.opacity = '0';
    } catch (e) { }

    // Start engine
    Runner.run(Runner.create(), engine);

    // Sync DOM loop
    (function syncLoop() {
        requestAnimationFrame(syncLoop);
        bodiesMapping.forEach(mapping => {
            const { body, el } = mapping;
            const width = parseFloat(el.style.width);
            const height = parseFloat(el.style.height);
            // Translate is calculated to top-left corner because element top/left are 0.
            el.style.transform = `translate(${body.position.x - width / 2}px, ${body.position.y - height / 2}px) rotate(${body.angle}rad)`;
        });
    })();
}
