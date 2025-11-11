// 恒达国际运输官网 - 超现代高级JavaScript功能文件

// 等待页面完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 高级导航栏滚动效果 =====
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    // 使用节流函数优化滚动性能
    const throttledScroll = throttle(function() {
        const scrollY = window.scrollY;
        
        // 导航栏滚动效果 - 更平滑的过渡
        if (scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(30px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(226, 232, 240, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'blur(30px)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(226, 232, 240, 0.3)';
        }
        
        // 返回顶部按钮显示/隐藏 - 添加动画效果
        if (scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // 视差滚动效果
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const parallaxSpeed = scrollY * 0.5;
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
    }, 16); // 60fps
    
    // 监听页面滚动事件
    window.addEventListener('scroll', throttledScroll);
    
    // ===== 高级返回顶部按钮功能 =====
    backToTopBtn.addEventListener('click', function() {
        // 添加点击动画效果
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // 平滑滚动到页面顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== 智能导航菜单高亮功能 =====
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 使用Intersection Observer API优化性能
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');
                
                // 更新导航菜单高亮状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // 观察所有section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ===== 高级平滑滚动到指定区域 =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 非站内锚点（例如 admin.html）保持默认跳转
            if (!targetId || !targetId.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 计算目标位置（考虑固定导航栏的高度）
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                // 添加点击动画效果
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 在移动端自动关闭导航菜单
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // ===== 高级联系按钮点击统计和动画 =====
    const contactButtons = document.querySelectorAll('.contact-buttons .btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 记录按钮点击事件
            const buttonText = this.textContent.trim();
            console.log(`用户点击了: ${buttonText}`);
            
            // 添加成功反馈动画
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check me-2"></i>正在跳转...';
            this.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    });
    
    // ===== 高级页面加载动画效果 =====
    function createAdvancedScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-item, .service-item, .route-item, .news-item, .contact-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // 添加延迟动画效果
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.filter = 'blur(0)';
                    }, index * 100);
                    
                    // 停止观察已动画的元素
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) scale(0.95)';
            element.style.filter = 'blur(5px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            animationObserver.observe(element);
        });
    }
    
    // 启动高级滚动动画
    createAdvancedScrollAnimations();
    
    // ===== 高级数字计数动画效果 =====
    function createCounterAnimations() {
        const counterElements = document.querySelectorAll('.animate-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // 2秒动画
                    const startTime = performance.now();
                    
                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // 使用缓动函数
                        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(target * easeOutCubic);
                        
                        entry.target.textContent = current;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(element => {
            counterObserver.observe(element);
        });
    }
    
    // 启动数字计数动画
    createCounterAnimations();
    
    // ===== 高级移动端触摸优化 =====
    if ('ontouchstart' in window) {
        // 为触摸设备优化点击效果
        const touchElements = document.querySelectorAll('.feature-item, .service-item, .route-item, .news-item, .contact-item, .btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
    
    // ===== 高级性能优化：懒加载图片 =====
    function createAdvancedLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 添加加载动画
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // 启动高级图片懒加载
    createAdvancedLazyLoading();
    
    // ===== 实时动态模拟数据与渲染 =====
    const realtimeListElement = document.getElementById('realtimeList');
    const realtimeTimestampElement = document.getElementById('realtimeTimestamp');
    
    /**
     * 构建 120 条实时动态模拟数据，后续若接入真实 API 可直接替换。
     * 通过随机的起始位置保证每次刷新显示的记录不同。
     */
    const realtimeMockQueue = buildRealtimeMockQueue();
    
    let realtimeCursor = Math.floor(Math.random() * Math.max(1, realtimeMockQueue.length - 5));
    const realtimeWindowSize = 5;
    
    /**
     * 生成当前窗口需要展示的实时动态列表，实现循环滚动效果。
     * @returns {Array} 实时动态数组
     */
    function getRealtimeWindow() {
        const items = [];
        for (let i = 0; i < realtimeWindowSize; i += 1) {
            const index = (realtimeCursor + i) % realtimeMockQueue.length;
            const event = realtimeMockQueue[index];
            items.push(event);
        }
        return items;
    }
    
    /**
     * 将实时动态数据渲染到页面，并更新刷新时间提示。
     */
    function renderRealtimeFeed() {
        if (!realtimeListElement || !realtimeTimestampElement) {
            return;
        }
        
        const items = getRealtimeWindow();
        realtimeListElement.innerHTML = '';
        
        items.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.className = 'realtime-item';
            listItem.innerHTML = `
                <div class="realtime-time">${formatDate(item.timestamp, {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}</div>
                <div class="realtime-body">
                    <div class="realtime-title">${item.title}</div>
                    <div class="realtime-desc">${item.description}</div>
                    <div class="realtime-tags">
                        ${item.tags.map(tag => `<span class="realtime-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            realtimeListElement.appendChild(listItem);
        });
        
        realtimeTimestampElement.textContent = formatDate(new Date(), {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        console.log('📡 实时动态已刷新', { cursor: realtimeCursor, visibleItems: items.length });
    }
    
    /**
     * 定时推进实时动态列表，形成持续滚动效果。
     */
    function startRealtimeTicker() {
        if (!realtimeListElement) {
            return;
        }
        
        renderRealtimeFeed();
        
        setInterval(() => {
            realtimeCursor = (realtimeCursor + 1) % realtimeMockQueue.length;
            renderRealtimeFeed();
        }, 8000);
    }
    
    startRealtimeTicker();
    
    function buildRealtimeMockQueue() {
        const totalEvents = 120;
        const routes = [
            {
                origin: '昆明',
                originHub: '昆明综合仓',
                destination: '曼谷',
                destinationCountry: '泰国',
                border: '磨憨—磨丁口岸',
                handoff: '泰国邦康中转站',
                lastMile: '曼谷市内派送',
                mode: '陆运',
                tags: ['陆运', '泰国']
            },
            {
                origin: '广州',
                originHub: '广州空运中心',
                destination: '新加坡',
                destinationCountry: '新加坡',
                airport: '广州白云机场',
                destAirport: '樟宜机场',
                lastMile: '樟宜机场进口仓派送',
                mode: '空运',
                tags: ['空运', '新加坡', '电商']
            },
            {
                origin: '深圳',
                originHub: '深圳盐田港',
                destination: '吉隆坡',
                destinationCountry: '马来西亚',
                portOfLoading: '盐田港',
                portOfDischarge: '巴生港',
                handoff: '巴生港自由贸易区',
                mode: '海运',
                tags: ['海运', '马来西亚']
            },
            {
                origin: '南宁',
                originHub: '南宁陆运枢纽',
                destination: '河内',
                destinationCountry: '越南',
                border: '友谊关口岸',
                handoff: '越南谅山中转仓',
                lastMile: '河内城区派送',
                mode: '陆运',
                tags: ['陆运', '越南']
            },
            {
                origin: '重庆',
                originHub: '重庆铁路货运中心',
                destination: '万象',
                destinationCountry: '老挝',
                border: '磨憨—磨丁口岸',
                handoff: '老挝万象综合仓',
                mode: '铁路',
                tags: ['铁路', '老挝']
            },
            {
                origin: '成都',
                originHub: '成都双流空运中心',
                destination: '胡志明市',
                destinationCountry: '越南',
                airport: '成都双流机场',
                destAirport: '新山一机场',
                lastMile: '胡志明市内冷链配送',
                mode: '空运',
                tags: ['空运', '越南', '高价值']
            },
            {
                origin: '昆明',
                originHub: '昆明冷链中心',
                destination: '仰光',
                destinationCountry: '缅甸',
                border: '清水河口岸',
                handoff: '仰光冷链仓',
                lastMile: '仰光城市冷链配送',
                mode: '冷链陆运',
                tags: ['冷链', '缅甸', '陆运']
            },
            {
                origin: '昆明',
                originHub: '昆明电商仓',
                destination: '金边',
                destinationCountry: '柬埔寨',
                border: '磨憨—磨丁口岸',
                handoff: '金边电商仓',
                lastMile: '金边城配',
                mode: '陆运',
                tags: ['陆运', '柬埔寨', '电商']
            },
            {
                origin: '上海',
                originHub: '上海洋山港',
                destination: '雅加达',
                destinationCountry: '印度尼西亚',
                portOfLoading: '洋山港',
                portOfDischarge: '丹戎不碌港',
                handoff: '雅加达保税仓',
                mode: '海运',
                tags: ['海运', '印尼']
            },
            {
                origin: '深圳',
                originHub: '深圳宝安空运中心',
                destination: '马尼拉',
                destinationCountry: '菲律宾',
                airport: '深圳宝安机场',
                destAirport: '尼诺伊·阿基诺机场',
                lastMile: '大马尼拉地区配送',
                mode: '空运',
                tags: ['空运', '菲律宾']
            },
            {
                origin: '天津',
                originHub: '天津港保税仓',
                destination: '吉隆坡',
                destinationCountry: '马来西亚',
                portOfLoading: '天津港',
                portOfDischarge: '巴生港',
                handoff: '吉隆坡大件仓',
                mode: '海运',
                tags: ['海运', '马来西亚', '大件']
            },
            {
                origin: '兰州',
                originHub: '兰州铁路集散中心',
                destination: '河口',
                destinationCountry: '越南',
                border: '河口口岸',
                handoff: '越南老街仓',
                mode: '铁路',
                tags: ['铁路', '越南']
            }
        ];
        
        const scenarios = [
            {
                title: route => `${route.origin}发往${route.destination}装车完成`,
                description: route => `${route.originHub}完成出库装车并电子封签，车辆驶往${route.border || route.handoff || `${route.destination}转运中心`}，预计 ${randomBetween(4, 8)} 小时抵达下一节点。`,
                extraTags: ['装车', '调度']
            },
            {
                title: route => `${route.destination}海关放行完成`,
                description: route => `${route.destinationCountry || route.destination}海关绿色通道顺利放行，货物进入${route.lastMile || '市内派送'}流程，预计 ${randomBetween(2, 6)} 小时送达客户。`,
                extraTags: route => ['清关', route.destinationCountry || route.destination]
            },
            {
                title: route => `${route.handoff || route.destination}中转入库完成`,
                description: route => `货物已在${route.handoff || `${route.destination}中转仓`}完成扫码入库，温控稳定在 ${randomBetween(2, 8)}℃，等待末端调度。`,
                extraTags: ['入库', '中转']
            },
            {
                title: route => `${route.destination}客户签收确认`,
                description: route => `${route.destination}客户完成签收，电子回单已回传并同步业务负责人。`,
                extraTags: ['签收', '客户反馈']
            },
            {
                title: route => `${route.origin}加班运力发车`,
                description: route => `${route.originHub}调配加班车辆应对峰值货量，预计 ${route.handoff || route.destination} ${randomBetween(6, 12)} 小时后接驳。`,
                extraTags: ['加班', '调度']
            },
            {
                title: route => `${route.destination}派送车辆出发`,
                description: route => `${route.destination}末端车队完成装载，沿${route.lastMile || '市区配送路线'}派送，预计 ${randomBetween(1, 4)} 小时送达终端客户。`,
                extraTags: ['派送', '最后一公里']
            },
            {
                title: route => `${route.destination}冷链温控巡检`,
                description: route => `冷链系统巡检完成，当前箱温 ${randomBetween(2, 8)}℃，温控设备运行正常，记录已同步监控平台。`,
                extraTags: route => (route.tags.includes('冷链') ? ['冷链', '巡检'] : ['巡检'])
            },
            {
                title: () => '客服满意度回访完成',
                description: route => `客服团队回访 ${route.destinationCountry || route.destination} 收货客户，满意度 ${(randomBetween(48, 50) / 10).toFixed(1)}/5，客户对运输时效给予好评。`,
                extraTags: ['客服', '回访']
            },
            {
                title: route => `${route.destinationCountry || route.destination}舱位确认完成`,
                description: route => `${route.mode}舱位/航班确认成功，预计按计划出运，舱单与订舱信息已同步至客户系统。`,
                extraTags: ['舱位', '计划']
            },
            {
                title: route => `${route.destination}报关资料预审通过`,
                description: () => `报关资料一次性通过预审，预计 ${randomBetween(1, 3)} 小时后提交正式申报。`,
                extraTags: ['报关', '资料']
            }
        ];
        
        const events = [];
        const now = Date.now();
        
        for (let i = 0; i < totalEvents; i += 1) {
            const route = routes[i % routes.length];
            const scenario = scenarios[i % scenarios.length];
            const timestamp = now - (i * 5 * 60 * 1000) - randomBetween(0, 3 * 60 * 1000);
            const extraTags = typeof scenario.extraTags === 'function' ? scenario.extraTags(route) : scenario.extraTags;
            const tags = Array.from(new Set([...route.tags, ...(extraTags || [])]));
            
            events.push({
                title: scenario.title(route),
                description: scenario.description(route),
                tags,
                timestamp
            });
        }
        
        return events;
    }
    
    // ===== 管理员登录前端校验 =====
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        const adminUsernameInput = document.getElementById('adminUsername');
        const adminPasswordInput = document.getElementById('adminPassword');
        const adminRememberCheckbox = document.getElementById('adminRemember');
        const adminFeedback = document.getElementById('adminLoginFeedback');
        const rememberStorageKey = 'hengda-admin-account';
        
        // 从本地存储预填演示账号信息
        const storedAccount = getLocalStorage(rememberStorageKey);
        if (storedAccount && storedAccount.username) {
            adminUsernameInput.value = storedAccount.username;
            adminRememberCheckbox.checked = true;
        }
        
        /**
         * 显示管理员登录反馈信息。
         * @param {string} message - 提示内容
         * @param {boolean} success - 是否登录成功
         */
        function showLoginFeedback(message, success) {
            adminFeedback.textContent = message;
            adminFeedback.className = 'login-feedback';
            adminFeedback.classList.add(success ? 'login-success' : 'login-error');
        }
        
        adminLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = adminUsernameInput.value.trim();
            const password = adminPasswordInput.value.trim();
            const remember = adminRememberCheckbox.checked;
            
            if (!username || !password) {
                showLoginFeedback('请输入用户名和密码', false);
                console.warn('管理员登录校验失败：字段为空');
                return;
            }
            
            const isCredentialValid = username === 'admin' && password === 'hengda123';
            
            if (isCredentialValid) {
                showLoginFeedback('登录成功，正在跳转演示页面...', true);
                console.log('✅ 管理员登录成功', { username, remember });
                
                if (remember) {
                    setLocalStorage(rememberStorageKey, { username }, 7 * 24 * 60 * 60 * 1000);
                } else {
                    removeLocalStorage(rememberStorageKey);
                }
                
                setTimeout(() => {
                    window.location.hash = '#site-footer';
                }, 1200);
            } else {
                showLoginFeedback('账号或密码错误，请检查后再试', false);
                console.warn('管理员登录失败：凭证不匹配', { username });
            }
        });
    }
    
    // ===== 高级鼠标跟随效果 =====
    function createMouseFollower() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // 平滑跟随动画
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    }
    
    // 启动鼠标跟随效果（仅在桌面端）
    if (window.innerWidth > 768) {
        createMouseFollower();
    }
    
    // ===== 高级错误处理和日志记录 =====
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
        // 这里可以添加错误上报逻辑
    });
    
    // ===== 高级页面性能监控 =====
    window.addEventListener('load', function() {
        // 页面加载完成后的性能统计
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            console.log('页面加载时间:', loadTime, 'ms');
            
            // 如果加载时间过长，显示优化提示
            if (loadTime > 3000) {
                console.warn('页面加载时间较长，建议优化资源');
            }
        }
        
        // 添加页面加载完成动画
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===== 高级键盘导航支持 =====
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape') {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
        
        // 空格键滚动到下一个section
        if (e.key === ' ' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const currentSection = document.querySelector('section[id]:target');
            if (currentSection) {
                const nextSection = currentSection.nextElementSibling;
                if (nextSection && nextSection.id) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
    
    // ===== 初始化完成提示 =====
    console.log('🚀 恒达国际运输官网高级版本初始化完成！');
    console.log('✨ 已启用所有高级功能和动画效果');
    
});

// ===== 高级工具函数 =====

// 高级防抖函数：避免频繁调用，支持立即执行选项
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// 高级节流函数：限制函数调用频率，支持尾调用选项
function throttle(func, limit, options = {}) {
    let inThrottle;
    let lastFunc;
    let lastRan;
    
    return function() {
        const context = this;
        const args = arguments;
        
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// 高级日期格式化函数
function formatDate(date, options = {}) {
    const defaultOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    return new Date(date).toLocaleDateString('zh-CN', finalOptions);
}

// 高级手机号验证函数
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 高级邮箱验证函数
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 高级Telegram链接打开函数
function openTelegram(username) {
    const telegramUrl = `https://t.me/${username}`;
    
    // 添加点击统计
    console.log(`打开Telegram: ${username}`);
    
    // 在新窗口打开
    const newWindow = window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    
    // 检查是否成功打开
    if (!newWindow) {
        console.warn('无法打开新窗口，可能被浏览器阻止');
        // 备用方案：直接跳转
        window.location.href = telegramUrl;
    }
}

// 高级动画缓动函数
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function easeOutBounce(t) {
    if (t < 1 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
}

// 高级随机数生成函数
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 高级颜色生成函数
function generateRandomColor() {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    return colors[randomBetween(0, colors.length - 1)];
}

// 高级设备检测函数
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    return {
        isMobile,
        isTablet,
        isDesktop,
        userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
    };
}

// 高级性能监控函数
function getPerformanceMetrics() {
    if (!('performance' in window)) {
        return null;
    }
    
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    return {
        // 页面加载时间
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        // DOM构建时间
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        // 首次内容绘制
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
        // 首次有意义内容绘制
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        // 总阻塞时间
        totalBlockingTime: navigation.loadEventEnd - navigation.fetchStart
    };
}

// 高级本地存储函数
function setLocalStorage(key, value, expiration = null) {
    const data = {
        value,
        timestamp: Date.now(),
        expiration: expiration ? Date.now() + expiration : null
    };
    
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('无法保存到本地存储:', error);
        return false;
    }
}

function getLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        if (!data) return null;
        
        const parsed = JSON.parse(data);
        
        // 检查是否过期
        if (parsed.expiration && Date.now() > parsed.expiration) {
            localStorage.removeItem(key);
            return null;
        }
        
        return parsed.value;
    } catch (error) {
        console.error('无法从本地存储读取:', error);
        return null;
    }
}

// 高级本地存储删除函数：统一处理移除逻辑与异常捕获
function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('无法删除本地存储数据:', error);
        return false;
    }
}

// 高级错误处理函数
function handleError(error, context = '') {
    const errorInfo = {
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    console.error('错误详情:', errorInfo);
    
    // 这里可以添加错误上报逻辑
    // 例如：发送到错误监控服务
    
    return errorInfo;
}

// 高级URL参数解析函数
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    
    for (const [key, value] of params) {
        result[key] = value;
    }
    
    return result;
}

// 高级滚动到元素函数
function scrollToElement(element, offset = 0, behavior = 'smooth') {
    if (!element) return;
    
    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
        top: elementPosition,
        behavior
    });
}

// 高级元素可见性检测函数
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
    );
}

// 高级复制到剪贴板函数
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // 备用方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const result = document.execCommand('copy');
            document.body.removeChild(textArea);
            return result;
        }
    } catch (error) {
        console.error('复制失败:', error);
        return false;
    }
}
