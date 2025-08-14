    (function () {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'elden' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      })();
      (function(){
        const html = document.documentElement;
        const checkbox = document.getElementById('themeSwitch');
        const label = document.getElementById('themeLabel');

        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = saved || (prefersDark ? 'elden' : 'light');

        function render(theme){
          const isElden = theme === 'elden';
          checkbox.checked = isElden;
          label.textContent = isElden ? '(Elden Ring)' : '(Light Mode)';
          document.querySelector('.theme-slider').setAttribute('aria-checked', isElden);
        }

        function apply(theme){
          html.setAttribute('data-theme', theme);
          localStorage.setItem('theme', theme);
          // play/pause bg video to save CPU
          var v = document.querySelector('.elden-video-bg');
          if (v){
            if (theme === 'elden') { v.play().catch(()=>{}); }
            else { try { v.pause(); } catch(e){} }
          }
          render(theme);
        }


        // initial setup
        html.setAttribute('data-theme', initial);
        render(initial);

        checkbox.addEventListener('change', () => {
          apply(checkbox.checked ? 'elden' : 'light');
        });

        if (!saved) {
          const mq = window.matchMedia('(prefers-color-scheme: dark)');
          mq.addEventListener('change', e => apply(e.matches ? 'elden' : 'light'));
        }
      })();
