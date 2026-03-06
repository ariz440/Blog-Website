// Blog posts data with video links
const blogPosts = [
    {
        id: 1,
        title: "Mastering Modern CSS: Flexbox and Grid",
        excerpt: "Learn how to create responsive layouts with CSS Flexbox and Grid. This comprehensive guide will take you from beginner to expert.",
        category: "Web Development",
        date: "June 15, 2023",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        videoUrl: "https://www.youtube.com/embed/qm0IfG1GyZU" // CSS Flexbox Tutorial
    },
    {
        id: 2,
        title: "JavaScript ES6+ Features You Should Know",
        excerpt: "Discover the most useful ES6+ features that will make your JavaScript code cleaner and more efficient.",
        category: "JavaScript",
        date: "June 10, 2023",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        videoUrl: "https://www.youtube.com/embed/NCwa_xi0Uuc" // ES6 Features
    },
    {
        id: 3,
        title: "Building Your First Portfolio Website",
        excerpt: "A step-by-step guide to creating an impressive portfolio website that showcases your skills and projects.",
        category: "Design",
        date: "June 5, 2023",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
        videoUrl: "https://www.youtube.com/embed/_xkSvufmjEs" // Portfolio Tutorial
    },
    {
        id: 4,
        title: "The Future of Web Development in 2023",
        excerpt: "Explore the latest trends and technologies that are shaping the future of web development.",
        category: "Technology",
        date: "May 28, 2023",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        videoUrl: "https://www.youtube.com/embed/ukLnPbIffxE" // Web Dev Trends
    },
    {
        id: 5,
        title: "Responsive Design Best Practices",
        excerpt: "Learn the essential techniques for creating websites that work perfectly on all devices.",
        category: "Design",
        date: "May 20, 2023",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80",
        videoUrl: "https://www.youtube.com/embed/VQraviuwbzU" // Responsive Design
    },
    {
        id: 6,
        title: "Introduction to React Hooks",
        excerpt: "Get started with React Hooks and learn how to use state and other React features in functional components.",
        category: "React",
        date: "May 15, 2023",
        readTime: "11 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        videoUrl: "https://www.youtube.com/embed/9xhKH43llhU" // React Hooks
    }
];

// DOM Elements
const blogGrid = document.getElementById('blogGrid');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const subscribeBtn = document.querySelector('.subscribe-btn');
const modal = document.getElementById('subscribeModal');
const closeModal = document.querySelector('.close-modal');
const subscribeForm = document.querySelector('.subscribe-form');
const contactForm = document.querySelector('.contact-form');

// Video Modal Elements
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const closeVideoModal = document.querySelector('.close-video-modal');

// Subscriber functionality variables
let subscriberCount = 0; // Start from 0
let monthlyGrowth = 0; // Start from 0

// Initialize the blog posts
function initBlogPosts() {
    if (!blogGrid) return;

    blogGrid.innerHTML = '';

    blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-image">
                <div class="blog-category">${post.category}</div>
                <img src="${post.image}" alt="${post.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span>${post.date}</span>
                    <span>${post.readTime}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more watch-video-btn" data-id="${post.id}">Watch Video <i class="fas fa-play-circle"></i></a>
            </div>
        `;

        blogGrid.appendChild(blogCard);

        // Add click event to play button in image
        const playButton = blogCard.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            openVideoModal(post);
        });
    });

    // Add event listeners to watch video buttons
    document.querySelectorAll('.watch-video-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const postId = parseInt(this.getAttribute('data-id'));
            const post = blogPosts.find(p => p.id === postId);
            if (post) {
                openVideoModal(post);
            }
        });
    });
}

// Open video modal
function openVideoModal(post) {
    if (!videoPlayer || !videoTitle || !videoModal) return;

    videoPlayer.src = post.videoUrl;
    videoTitle.textContent = post.title;
    videoModal.classList.add('show');

    // Pause background videos if any
    document.querySelectorAll('video').forEach(vid => {
        if (vid !== videoPlayer) vid.pause();
    });
}

// Close video modal
function closeVideoModalFunc() {
    if (!videoPlayer || !videoModal) return;

    videoPlayer.src = '';
    videoModal.classList.remove('show');
}

// Toggle mobile menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Back to top button
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Modal functionality
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) {
            modal.classList.add('show');
        }
    });
}

if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

if (closeVideoModal) {
    closeVideoModal.addEventListener('click', closeVideoModalFunc);
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
        if (e.target === videoModal) {
            closeVideoModalFunc();
        }
    });
}

// Initialize subscriber functionality
function initSubscriberFunctionality() {
    // Load subscriber data from localStorage
    loadSubscriberData();

    // Update all subscriber displays
    updateAllSubscriberDisplays();

    // Create subscription success element if it doesn't exist
    const existingSuccess = document.querySelector('.subscription-success');
    if (!existingSuccess) {
        const subscriptionSuccess = document.createElement('div');
        subscriptionSuccess.className = 'subscription-success';
        subscriptionSuccess.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Subscription Successful!</h3>
            <p>Thank you for subscribing to BlogSphere. You'll receive our latest updates soon.</p>
        `;

        // Add success message container after the form
        const newsletterContent = document.querySelector('.newsletter-content');
        const subscribeForm = document.querySelector('.subscribe-form');
        if (newsletterContent && subscribeForm) {
            newsletterContent.insertBefore(subscriptionSuccess, subscribeForm.nextSibling);
        }
    }
}

// Animate number counter
function animateCounter(element, start, end, duration) {
    if (!element) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Update subscriber count
function updateSubscriberCount() {
    subscriberCount++;

    // Update monthly growth
    const today = new Date();
    const currentMonth = today.getMonth();
    const savedMonth = localStorage.getItem('blogsphere_current_month');

    if (savedMonth && parseInt(savedMonth) === currentMonth) {
        monthlyGrowth++;
    } else {
        monthlyGrowth = 1;
        localStorage.setItem('blogsphere_current_month', currentMonth.toString());
    }

    // Update all displays
    updateAllSubscriberDisplays();

    // Save to localStorage
    localStorage.setItem('blogsphere_subscriber_count', subscriberCount.toString());
    localStorage.setItem('blogsphere_monthly_growth', monthlyGrowth.toString());

    console.log(`Subscriber updated: ${subscriberCount}, Monthly Growth: ${monthlyGrowth}`);
}

// Update all subscriber displays
function updateAllSubscriberDisplays() {
    // Update main counter
    const subscriberCountElement = document.getElementById('subscriberCount');
    if (subscriberCountElement) {
        const currentValue = parseInt(subscriberCountElement.textContent.replace(/,/g, '') || '0');
        if (currentValue !== subscriberCount) {
            animateCounter(subscriberCountElement, currentValue, subscriberCount, 500);
        } else {
            subscriberCountElement.textContent = subscriberCount.toLocaleString();
        }
    }

    // Update stats counters
    updateStatsCounters();

    // Update trend indicator
    updateTrendIndicator();
}

// Update stats counters
function updateStatsCounters() {
    const totalSubscribersElement = document.getElementById('totalSubscribers');
    const monthlyGrowthElement = document.getElementById('monthlyGrowth');
    const countriesElement = document.getElementById('countries');
    const openRateElement = document.getElementById('openRate');

    if (totalSubscribersElement) {
        totalSubscribersElement.textContent = subscriberCount.toLocaleString();
    }
    if (monthlyGrowthElement) {
        monthlyGrowthElement.textContent = monthlyGrowth.toLocaleString();
    }
    if (countriesElement) {
        countriesElement.textContent = Math.min(Math.floor(subscriberCount / 50), 100).toLocaleString();
    }
    if (openRateElement) {
        // Calculate open rate based on subscribers (for demo)
        const openRate = Math.min(95, 70 + Math.floor(subscriberCount / 20));
        openRateElement.textContent = openRate.toLocaleString();
    }
}

// Update trend indicator
function updateTrendIndicator() {
    const trendElement = document.querySelector('.counter-trend span');
    if (trendElement) {
        trendElement.textContent = `+${monthlyGrowth} this month`;
    }
}

// Load subscriber data from localStorage
function loadSubscriberData() {
    const savedCount = localStorage.getItem('blogsphere_subscriber_count');
    const savedGrowth = localStorage.getItem('blogsphere_monthly_growth');

    if (savedCount) {
        subscriberCount = parseInt(savedCount);
    } else {
        subscriberCount = 0;
    }

    if (savedGrowth) {
        monthlyGrowth = parseInt(savedGrowth);
    } else {
        monthlyGrowth = 0;
    }

    console.log(`Loaded from localStorage: Subscribers: ${subscriberCount}, Growth: ${monthlyGrowth}`);
}

// Enhanced form submission
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        if (!emailInput) return;

        const email = emailInput.value.trim();

        // Validate email
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address.');
            return;
        }

        // Check if already subscribed
        const subscribedEmails = JSON.parse(localStorage.getItem('blogsphere_subscribed_emails') || '[]');
        if (subscribedEmails.includes(email)) {
            showFormError('This email is already subscribed.');
            return;
        }

        // Add to subscribed emails
        subscribedEmails.push(email);
        localStorage.setItem('blogsphere_subscribed_emails', JSON.stringify(subscribedEmails));

        // Update subscriber count
        updateSubscriberCount();

        // Show success message
        showSuccessMessage(email);

        // Reset form
        subscribeForm.reset();

        // Close modal if open
        if (modal) {
            modal.classList.remove('show');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showFormError(message) {
    // Remove any existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    errorElement.style.cssText = `
        background-color: rgba(255, 87, 87, 0.1);
        border: 1px solid rgba(255, 87, 87, 0.3);
        color: #ff5757;
        padding: 12px 15px;
        border-radius: 8px;
        margin-top: 15px;
        display: flex;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;

    errorElement.querySelector('i').style.marginRight = '10px';

    // Insert after form
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm && subscribeForm.parentNode) {
        subscribeForm.parentNode.insertBefore(errorElement, subscribeForm.nextSibling);
    }

    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.style.opacity = '0';
            errorElement.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Show success message
function showSuccessMessage(email) {
    // Remove any existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Update success message with email
    const successElement = document.querySelector('.subscription-success');
    if (successElement) {
        const successMessage = successElement.querySelector('p');
        if (successMessage) {
            successMessage.textContent = `Thank you for subscribing with ${email}. You'll receive our latest updates soon.`;
        }

        // Show success message
        successElement.classList.add('show');

        // Hide success message after 5 seconds
        setTimeout(() => {
            successElement.classList.remove('show');
        }, 5000);
    }

    // Send simulated API request
    simulateSubscriptionAPI(email);
}

// Simulate API call
function simulateSubscriptionAPI(email) {
    console.log(`Subscription API call for: ${email}`);
}

// Stats animation
function initStatsAnimation() {
    const totalSubscribersElement = document.getElementById('totalSubscribers');
    const monthlyGrowthElement = document.getElementById('monthlyGrowth');
    const countriesElement = document.getElementById('countries');
    const openRateElement = document.getElementById('openRate');

    const stats = [
        { element: totalSubscribersElement, target: subscriberCount },
        { element: monthlyGrowthElement, target: monthlyGrowth },
        { element: countriesElement, target: Math.min(Math.floor(subscriberCount / 50), 100) },
        { element: openRateElement, target: Math.min(95, 70 + Math.floor(subscriberCount / 20)) }
    ];

    // Animate each stat when in viewport
    stats.forEach(stat => {
        if (stat.element) {
            animateCounter(stat.element, 0, stat.target, 1500);
        }
    });
}

// Intersection Observer for stats animation
function setupStatsObserver() {
    const statsSection = document.querySelector('.subscription-stats');

    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initStatsAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

// 
