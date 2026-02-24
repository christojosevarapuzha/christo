const rabbitHoleContent = [
    '<div class="text-center p-8 border border-current rounded-xl opacity-80 max-w-lg mx-auto mb-12">"Is someone still scrolling?"</div>',
    '<div class="text-center p-8 opacity-60 font-mono text-sm max-w-lg mx-auto mb-12">System.out.println("Hello down here.");</div>',
    '<div class="text-center p-8 border-2 border-dashed border-current rounded-xl opacity-90 max-w-lg mx-auto mb-12"><h3 class="text-2xl font-bold mb-2">Fun Fact #1</h3><p>Pala, Kerala is known as the Meenachil Rubber City. I have probably seen more rubber trees than actual people in my lifetime.</p></div>',
    '<div class="text-center p-8 opacity-50 text-xs tracking-[0.5em] max-w-lg mx-auto mb-12">... WAKE UP NEO ...</div>',
    '<div class="text-center p-8 border border-red-500 text-red-500 rounded-xl opacity-80 max-w-lg mx-auto mb-12 font-bold animate-pulse">WARNING: YOU ARE SCROLLING DANGEROUSLY DEEP</div>',
    '<div class="text-center p-8 opacity-40 max-w-lg mx-auto mb-12"><pre class="text-left text-[10px] sm:text-xs">\\n  /\\_/\\  \\n ( o.o ) \\n  > ^ <  \\nMeow from the abyss.</pre></div>',
    '<div class="text-center p-12 bg-current text-black dark:text-gold rounded-full font-black text-2xl uppercase max-w-sm mx-auto mb-12 transform -rotate-6 shadow-xl">Did you find the DO NOT CLICK button yet?</div>',
    '<div class="text-center p-8 opacity-60 font-mono text-sm max-w-lg mx-auto mb-12">git commit -m "fixed bug by adding more bugs"</div>',
    '<div class="text-center p-8 border border-current rounded-xl opacity-80 max-w-lg mx-auto mb-12"><h3 class="text-2xl font-bold mb-2">Fun Fact #2</h3><p>Backend developers don\'t actually understand CSS. We just copy-paste Tailwind classes until it looks okay.</p></div>',
    '<div class="text-center p-8 opacity-30 text-4xl max-w-lg mx-auto mb-12">🕳️ 🐇</div>',
    '<div class="text-center p-8 opacity-70 font-mono text-xs max-w-lg mx-auto mb-12 bg-black text-green-500 rounded text-left overflow-hidden"><pre>Exception in thread "main" java.lang.NullPointerException<br>  at life.Decisions.makeGoodChoice(Decisions.java:42)<br>  at christo.Brain.process(Brain.java:108)</pre></div>',
    '<div class="text-center p-8 opacity-60 font-mono text-sm max-w-lg mx-auto mb-12">npm install --save anxiety</div>',
    '<div class="text-center p-8 opacity-80 text-xl font-bold max-w-lg mx-auto mb-12">Why do Java programmers have to wear glasses?<br><br><span class="opacity-50 text-sm">Because they don\'t C#.</span></div>',
    '<div class="flex justify-center mb-12"><div class="p-8 border-4 border-current bg-current text-black dark:text-gold font-black rotate-3 max-w-sm">CSS IS AWESOME</div></div>',
    '<div class="text-center p-8 opacity-50 max-w-lg mx-auto mb-12 text-6xl">👁️</div>',
    '<div class="text-center p-8 opacity-40 font-mono max-w-lg mx-auto mb-12 text-left bg-gray-900 text-green-400 p-4 rounded shadow-inner">Downloading more RAM... [||||||||||99%]</div>',
    '<div class="text-center p-8 opacity-60 italic max-w-lg mx-auto mb-12">"To understand recursion, you must first understand recursion."</div>',
    '<div class="text-center p-8 opacity-70 font-black tracking-widest uppercase max-w-lg mx-auto mb-12">Ctrl+C, Ctrl+V: The Developer\'s Prayer</div>',
    '<div class="text-center p-8 opacity-60 max-w-lg mx-auto mb-12">Have you tried turning yourself off and on again?</div>',
    '<div class="text-center p-8 border border-dashed border-current opacity-50 max-w-lg mx-auto mb-12 rounded-full">There is no cloud.<br>It\'s just someone else\'s computer.</div>',
    '<div class="text-center p-8 opacity-30 font-mono text-sm max-w-lg mx-auto mb-12">Error 404: Sense of purpose not found.</div>',
    '<div class="text-center p-8 opacity-40 text-green-500 font-mono max-w-lg mx-auto mb-12 text-xs text-left" style="writing-mode: vertical-rl;">01101000 01100101 01101100 01110000</div>',
    '<div class="text-center p-8 opacity-60 font-mono max-w-lg mx-auto mb-12 text-left bg-black text-gray-500 rounded">/* TODO: Fix this later.<br>&nbsp;&nbsp;&nbsp;Narrator: He didn\'t. */</div>',
    '<div class="text-center p-8 opacity-50 max-w-lg mx-auto mb-12 text-lg">I hope you brought a flashlight.</div>',
    '<div class="text-center p-8 border-t border-b border-current opacity-60 max-w-lg mx-auto mb-12">You are now entering the Mariana Trench of this website.</div>',
    '<div class="text-center p-8 opacity-80 font-bold max-w-lg mx-auto mb-12 text-2xl hover:scale-110 transition-transform">Is it too late to go back?</div>',
    '<div class="text-center p-8 opacity-40 font-mono max-w-lg mx-auto mb-12">echo "please stop scrolling"</div>',
    '<div class="text-center p-8 opacity-70 font-mono max-w-lg mx-auto mb-12 text-red-500 font-bold text-2xl bg-black px-4 py-2 rounded">sudo rm -rf /</div>',
    '<div class="text-center p-8 border-2 border-current rounded-full opacity-60 max-w-lg mx-auto mb-12 italic">"If it works on my machine, we\'ll ship my machine."</div>',
    '<div class="text-center p-8 opacity-50 font-mono text-xs max-w-lg mx-auto mb-12">99 little bugs in the code. <br>Take one down, patch it around... <br>127 little bugs in the code.</div>',
    '<div class="text-center p-8 opacity-20 text-xs max-w-lg mx-auto mb-12 tracking-widest">It\'s getting very dark down here.</div>',
    '<div class="text-center p-8 opacity-90 max-w-lg mx-auto mb-12 bg-blue-600 text-white font-bold p-2 text-xl overflow-hidden"><marquee scrollamount="15">WELCOME TO 1999</marquee></div>',
    '<div class="text-center p-8 opacity-60 max-w-lg mx-auto mb-12">Looking for a job? No wait, looking for meaning.</div>',
    '<div class="text-center p-8 border border-current opacity-70 max-w-lg mx-auto mb-12 transform skew-x-12">Are you a QA tester? Because you\'re pushing the limits.</div>',
    '<div style="text-align:center; padding: 2rem; opacity: 0.5; margin-bottom: 3rem;">You\'ve scrolled so far we ran out of CSS styling...</div>',
    '<div class="text-center p-8 opacity-60 max-w-lg mx-auto mb-12 font-bold text-3xl">What if I told you the bottom doesn\'t exist?</div>',
    '<div class="text-center p-8 max-w-lg mx-auto mb-12 text-xl font-bold italic">"I could have stopped scrolling 5 minutes ago." — You</div>',
    '<div class="text-center p-8 opacity-20 text-[8rem] max-w-lg mx-auto mb-12 rotate-180">C</div>',
    '<div class="text-center p-8 border border-current rounded-xl opacity-100 max-w-lg mx-auto mb-12 bg-white text-black"><img src="/images/dog.jpg" alt="Dog again" class="rounded object-cover h-48 w-full mb-4"><p class="font-bold uppercase tracking-widest text-sm">Reward for scrolling: Dog.</p></div>',
    '<div class="text-center p-8 opacity-50 max-w-lg mx-auto mb-12 font-mono">Status code: 418 I\'m a teapot 🫖</div>',
    '<div class="text-center p-8 opacity-10 max-w-lg mx-auto mb-12">.</div>',
    '<div class="text-center p-8 opacity-10 max-w-lg mx-auto mb-12">.</div>',
    '<div class="text-center p-8 opacity-10 max-w-lg mx-auto mb-12">.</div>',
    '<div class="text-center p-16 border-4 border-current rounded-3xl opacity-100 max-w-2xl mx-auto mb-32"><h2 class="text-5xl font-black mb-6 uppercase tracking-tighter">You win.</h2><p class="text-xl mb-6">You literally reached the absolute bottom of the internet.</p><button onclick="window.scrollTo({top:0, behavior:\'smooth\'})" class="px-8 py-4 bg-current text-black dark:text-gold rounded-full font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">Take me back up 🚀</button></div>'
];

let rabbitIndex = 0;
let isAppending = false;

document.addEventListener("DOMContentLoaded", () => {
    const rabbitHole = document.getElementById('rabbit-hole');
    if (!rabbitHole) return;

    // Create a target div to observe
    const loadingTarget = document.createElement('div');
    loadingTarget.id = 'rabbit-hole-target';
    loadingTarget.className = 'w-full h-24 mb-12 flex justify-center items-center opacity-50 transition-opacity';
    // Small animated arrow to coax them
    loadingTarget.innerHTML = '<div class="animate-bounce">↓</div>';

    // Insert target right after the empty rabbit hole container
    rabbitHole.parentNode.insertBefore(loadingTarget, rabbitHole.nextSibling);

    const observerOption = {
        root: null,
        rootMargin: '0px 0px 200px 0px', // Trigger slightly before it comes into view
        threshold: 0.1
    };

    const appendNextRabbitHoleItem = () => {
        if (rabbitIndex >= rabbitHoleContent.length || isAppending) {
            if (rabbitIndex >= rabbitHoleContent.length) {
                loadingTarget.style.display = 'none'; // Hide arrow when done
            }
            return;
        }

        isAppending = true;

        // Slight artificial delay to make it feel like "loading" real content
        setTimeout(() => {
            // Fade out previous items so only the new one is visible, but they still take up scroll space
            const previousItems = rabbitHole.querySelectorAll('.rabbit-item');
            previousItems.forEach(item => {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.visibility = 'hidden'; // Ensure they can't be clicked after fading
                }, 1000);
            });

            const newItem = document.createElement('div');
            newItem.className = 'rabbit-item w-full opacity-0 translate-y-8 transition-all duration-700 ease-out';
            newItem.innerHTML = rabbitHoleContent[rabbitIndex];

            rabbitHole.appendChild(newItem);

            // Trigger animation frame for CSS transition
            requestAnimationFrame(() => {
                newItem.classList.remove('opacity-0', 'translate-y-8');
            });

            rabbitIndex++;
            isAppending = false;
        }, 300);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                appendNextRabbitHoleItem();
            }
        });
    }, observerOption);

    observer.observe(loadingTarget);
});
