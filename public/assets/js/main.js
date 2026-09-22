!function(e) {
    "use strict";
    function t(t) {
        e(t).length > 0 && e(t).each((function() {
            var t = e(this).find("a");
            e(this).find(t).each((function() {
                e(this).on("click", (function() {
                    var t = e(this.getAttribute("href"));
                    t.length && (event.preventDefault(),
                    e("html, body").stop().animate({
                        scrollTop: t.offset().top - 10
                    }, 1e3))
                }
                ))
            }
            ))
        }
        ))
    }
    if (e(window).on("load", (function() {
        e(".preloader").fadeOut()
    }
    )),
    e(".preloader").length > 0 && e(".preloaderCls").each((function() {
        e(this).on("click", (function(t) {
            t.preventDefault(),
            e(".preloader").css("display", "none")
        }
        ))
    }
    )),
    e(".loader-wrap").length > 0 && e((function() {
        const e = document.getElementById("svg")
          , t = gsap.timeline();
        t.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
            delay: 1.5,
            y: -100,
            opacity: 0
        }),
        t.to(e, {
            duration: .5,
            attr: {
                d: "M0 502S175 272 500 272s500 230 500 230V0H0Z"
            },
            ease: "power2.easeIn"
        }).to(e, {
            duration: .5,
            attr: {
                d: "M0 2S175 1 500 1s500 1 500 1V0H0Z"
            },
            ease: "power2.easeOut"
        }),
        t.to(".loader-wrap", {
            y: -1500
        }),
        t.to(".loader-wrap", {
            zIndex: -1,
            display: "none"
        })
    }
    )),
    e(".nice-select").length && e(".nice-select").niceSelect(),
    e.fn.thmobilemenu = function(t) {
        var n = e.extend({
            menuToggleBtn: ".th-menu-toggle",
            bodyToggleClass: "th-body-visible",
            subMenuClass: "th-submenu",
            subMenuParent: "th-item-has-children",
            subMenuParentToggle: "th-active",
            meanExpandClass: "th-mean-expand",
            appendElement: '<span class="th-mean-expand"></span>',
            subMenuToggleClass: "th-open",
            toggleSpeed: 400
        }, t);
        return this.each((function() {
            var t = e(this);
            function o() {
                t.toggleClass(n.bodyToggleClass);
                var o = "." + n.subMenuClass;
                e(o).each((function() {
                    e(this).hasClass(n.subMenuToggleClass) && (e(this).removeClass(n.subMenuToggleClass),
                    e(this).css("display", "none"),
                    e(this).parent().removeClass(n.subMenuParentToggle))
                }
                ))
            }
            t.find("li").each((function() {
                var t = e(this).find("ul");
                t.addClass(n.subMenuClass),
                t.css("display", "none"),
                t.parent().addClass(n.subMenuParent),
                t.prev("a").append(n.appendElement),
                t.next("a").append(n.appendElement)
            }
            ));
            var a = "." + n.meanExpandClass;
            e(a).each((function() {
                e(this).on("click", (function(t) {
                    var o;
                    t.preventDefault(),
                    o = e(this).parent(),
                    e(o).next("ul").length > 0 ? (e(o).parent().toggleClass(n.subMenuParentToggle),
                    e(o).next("ul").slideToggle(n.toggleSpeed),
                    e(o).next("ul").toggleClass(n.subMenuToggleClass)) : e(o).prev("ul").length > 0 && (e(o).parent().toggleClass(n.subMenuParentToggle),
                    e(o).prev("ul").slideToggle(n.toggleSpeed),
                    e(o).prev("ul").toggleClass(n.subMenuToggleClass))
                }
                ))
            }
            )),
            e(n.menuToggleBtn).each((function() {
                e(this).on("click", (function() {
                    o()
                }
                ))
            }
            )),
            t.on("click", (function(e) {
                e.stopPropagation(),
                o()
            }
            )),
            t.find("div").on("click", (function(e) {
                e.stopPropagation()
            }
            ))
        }
        ))
    }
    ,
    e(".th-menu-wrapper").thmobilemenu(),
    e(window).on("scroll", (function() {
        e(this).scrollTop() > 500 ? e(".sticky-wrapper").hasClass("sticky") || e(".sticky-wrapper").addClass("sticky").stop(!0, !0).slideDown(300) : e(".sticky-wrapper").hasClass("sticky") && e(".sticky-wrapper").stop(!0, !0).slideUp(300, (function() {
            e(this).removeClass("sticky").show()
        }
        ))
    }
    )),
    t(".onepage-nav"),
    t(".scroll-down"),
    e(window).on("scroll", (function() {
        e(".onepage-nav").length
    }
    )),
    e(window).scroll((function() {
        e(this).scrollTop() > 500 ? (e(".sticky-wrapper").addClass("sticky"),
        e(".category-menu").addClass("close-category")) : (e(".sticky-wrapper").removeClass("sticky"),
        e(".category-menu").removeClass("close-category"))
    }
    )),
    e(".menu-expand").each((function() {
        e(this).on("click", (function(t) {
            t.preventDefault(),
            e(".category-menu").toggleClass("open-category")
        }
        ))
    }
    )),
    e(".scroll-top")) {
        var n = document.querySelector(".scroll-top")
          , o = document.querySelector(".scroll-top path")
          , a = o.getTotalLength();
        o.style.transition = o.style.WebkitTransition = "none",
        o.style.strokeDasharray = a + " " + a,
        o.style.strokeDashoffset = a,
        o.getBoundingClientRect(),
        o.style.transition = o.style.WebkitTransition = "stroke-dashoffset 10ms linear";
        var s = function() {
            var t = e(window).scrollTop()
              , n = e(document).height() - e(window).height()
              , s = a - t * a / n;
            o.style.strokeDashoffset = s
        };
        s(),
        e(window).scroll(s);
        jQuery(window).on("scroll", (function() {
            jQuery(this).scrollTop() > 50 ? jQuery(n).addClass("show") : jQuery(n).removeClass("show")
        }
        )),
        jQuery(n).on("click", (function(e) {
            return e.preventDefault(),
            jQuery("html, body").animate({
                scrollTop: 0
            }, 750),
            !1
        }
        ))
    }
    e("[data-bg-src]").length > 0 && e("[data-bg-src]").each((function() {
        var t = e(this).attr("data-bg-src");
        e(this).css("background-image", "url(" + t + ")"),
        e(this).removeAttr("data-bg-src").addClass("background-image")
    }
    )),
    e("[data-bg-color]").length > 0 && e("[data-bg-color]").each((function() {
        var t = e(this).attr("data-bg-color");
        e(this).css("background-color", t),
        e(this).removeAttr("data-bg-color")
    }
    )),
    e("[data-border]").each((function() {
        var t = e(this).data("border");
        e(this).css("--th-border-color", t)
    }
    )),
    e("[data-mask-src]").length > 0 && e("[data-mask-src]").each((function() {
        var t = e(this).attr("data-mask-src");
        e(this).css({
            "mask-image": "url(" + t + ")",
            "-webkit-mask-image": "url(" + t + ")"
        }),
        e(this).addClass("bg-mask"),
        e(this).removeAttr("data-mask-src")
    }
    )),
    e(".th-slider").each((function() {
        var t = e(this)
          , n = t.data("slider-options") || {}
          , o = t.find(".slider-prev")
          , a = t.find(".slider-next")
          , s = t.find(".slider-pagination.pagi-number")
          , i = t.siblings(".slider-controller").find(".slider-pagination")
          , r = i.length ? i.get(0) : t.find(".slider-pagination").get(0)
          , l = n.paginationType || "bullets"
          , c = void 0 !== n.autoplay ? n.autoplay : {
            delay: 6e3,
            disableOnInteraction: !1
        }
          , d = {
            slidesPerView: 1,
            spaceBetween: n.spaceBetween || 24,
            loop: !1 !== n.loop,
            speed: n.speed || 1e3,
            autoplay: c,
            navigation: {
                nextEl: a.get(0),
                prevEl: o.get(0)
            },
            pagination: {
                el: r,
                type: l,
                clickable: !0,
                renderBullet: function(e, t) {
                    var n = e + 1
                      , o = n < 10 ? "0" + n : n;
                    return s.length ? '<span class="' + t + ' number">' + o + "</span>" : '<span class="' + t + '" aria-label="Go to Slide ' + o + '"></span>'
                },
                formatFractionCurrent: function(e) {
                    return e < 10 ? "0" + e : e
                },
                formatFractionTotal: function(e) {
                    return e < 10 ? "0" + e : e
                },
                renderFraction: function(e, t) {
                    return '<span class="' + e + '"></span> <span class="line"></span> <span class="' + t + '"></span>'
                }
            },
            on: {
                init: function() {
                    var t = this;
                    t.slides.forEach((function(n) {
                        e(n).find(".showcase-slider-bg, .img").attr("data-swiper-parallax", .75 * t.width)
                    }
                    ))
                },
                resize: function() {
                    this.update()
                },
                slideChange: function() {
                    setTimeout( () => this.params.mousewheel.releaseOnEdges = !1, 500)
                },
                reachEnd: function() {
                    setTimeout( () => this.params.mousewheel.releaseOnEdges = !0, 750)
                }
            }
        }
          , u = t.attr("data-slider-options");
        if (u)
            try {
                u = JSON.parse(u),
                d = e.extend({}, d, u)
            } catch (e) {
                console.warn("Invalid JSON in data-slider-options", e)
            }
        new Swiper(t.get(0),d)
    }
    ));
    new Swiper(".showcase-slider-active",{
        speed: 1500,
        autoplay: {
            delay: 6e3
        },
        parallax: !0,
        loop: !0,
        pagination: {
            el: ".th-hero-wrapper .swiper-pagination",
            clickable: !0,
            renderBullet: function(e, t) {
                return `\n                <span class="${t}">\n                    <svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">\n                        <circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF" stroke-opacity="1" stroke-width="1px"></circle>\n                        <circle cx="8" cy="8" r="3" fill="#FFF"></circle>\n                    </svg>\n                </span>\n            `
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            init: function() {
                var t = this;
                t.slides.forEach((function(n) {
                    e(n).find(".showcase-slider-bg").attr("data-swiper-parallax", .75 * t.width)
                }
                ))
            },
            resize: function() {
                this.update()
            }
        }
    }),
    new Swiper(".showcase-slider-active2",{
        speed: 1500,
        autoplay: {
            delay: 6e3,
            disableOnInteraction: !1
        },
        parallax: !0,
        loop: !0,
        pagination: {
            el: ".th-hero-wrapper .swiper-pagination",
            type: "progressbar",
            renderProgressbar: function(e) {
                return `\n                <div class="progressbar-wrapper">\n                    <div class="fraction-count">\n                        <span class="current">01</span>\n                        <span class="divider">/</span>\n                        <span class="total">03</span>\n                    </div>\n                    <div class="progress-line ${e}"></div>\n                </div>\n            `
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            init: function() {
                var t = this;
                const n = document.querySelector(".fraction-count .total");
                n && (n.textContent = t.slides.length < 10 ? "0" + t.slides.length : t.slides.length),
                t.slides.forEach((function(n) {
                    e(n).find(".showcase-slider-bg").attr("data-swiper-parallax", .75 * t.width)
                }
                )),
                i(t)
            },
            slideChange: function() {
                i(this)
            },
            resize: function() {
                this.update()
            }
        }
    });
    function i(e) {
        const t = document.querySelector(".fraction-count .current");
        if (t) {
            const n = e.realIndex + 1;
            t.textContent = n < 10 ? "0" + n : n
        }
    }
    e(".slider-area").length > 0 && e(".slider-area").closest(".container").parent().addClass("arrow-wrap"),
    e("[data-ani]").each((function() {
        var t = e(this).data("ani");
        e(this).addClass(t)
    }
    )),
    e("[data-ani-delay]").each((function() {
        var t = e(this).data("ani-delay");
        e(this).css("animation-delay", t)
    }
    )),
    e("[data-slider-prev], [data-slider-next]").on("click", (function() {
        var t = e(this).data("slider-prev") || e(this).data("slider-next")
          , n = e(t);
        if (n.length) {
            var o = n[0].swiper;
            o && (e(this).data("slider-prev") ? o.slidePrev() : o.slideNext())
        }
    }
    )),
    e("#slider").on("input change", t => {
        const n = t.target.value;
        e(".foreground-img").css("width", n + "%"),
        e(".slider-button").css("left", `calc(${n}% - 18px)`)
    }
    ),
    e(".hover-item").hover((function() {
        e(this).addClass("item-active"),
        e(this).siblings().removeClass("item-active")
    }
    )),
    e.fn.activateSliderThumbs = function(t) {
        var n = e.extend({
            sliderTab: !1,
            tabButton: ".tab-btn"
        }, t);
        return this.each((function() {
            var t = e(this)
              , o = t.find(n.tabButton)
              , a = e('<span class="indicator"></span>').appendTo(t)
              , s = t.data("slider-tab")
              , i = e(s)[0].swiper;
            if (o.on("click", (function(t) {
                t.preventDefault();
                var o = e(this);
                o.addClass("active").siblings().removeClass("active"),
                l(o),
                n.sliderTab && i.slideTo(o.index())
            }
            )),
            n.sliderTab) {
                i.on("slideChange", (function() {
                    var e = i.activeIndex
                      , t = o.eq(e);
                    t.addClass("active").siblings().removeClass("active"),
                    l(t)
                }
                ));
                var r = o.eq(i.activeIndex);
                r.addClass("active").siblings().removeClass("active"),
                l(r)
            }
            function l(e) {
                var t = e.position();
                a.css("--pos-y", t.top + "px")
            }
        }
        ))
    }
    ,
    e(".hero-thumb").length && e(".hero-thumb").activateSliderThumbs({
        sliderTab: !0,
        tabButton: ".tab-btn"
    }),
    e(".testi-card-tab").length && e(".testi-card-tab").activateSliderThumbs({
        sliderTab: !0,
        tabButton: ".tab-btn"
    }),
    e(".testi-box-tab").length && e(".testi-box-tab").activateSliderThumbs({
        sliderTab: !0,
        tabButton: ".tab-btn"
    }),
    e(".property-thumb").length && e(".property-thumb").activateSliderThumbs({
        sliderTab: !0,
        tabButton: ".tab-btn"
    }),
    document.querySelectorAll(".testi-box-tab .tab-btn").forEach((function(e) {
        e.addEventListener("mouseenter", (function() {
            let e = this.querySelector("img").getAttribute("src");
            document.querySelector(".testi-img img").setAttribute("src", e)
        }
        ))
    }
    )),
    e(".testi-box-tab .tab-btn").hover((function() {
        var t = e(this).find("img").attr("src");
        e(".testi-img img").attr("src", t)
    }
    ));
    var r, l, c, d = ".ajax-contact", u = '[name="email"]', p = e(".form-messages");
    function g() {
        var t = e(d).serialize();
        (function() {
            var t, n = !0;
            function o(o) {
                o = o.split(",");
                for (var a = 0; a < o.length; a++)
                    t = d + " " + o[a],
                    e(t).val() ? (e(t).removeClass("is-invalid"),
                    n = !0) : (e(t).addClass("is-invalid"),
                    n = !1)
            }
            o('[name="name"],[name="email"],[name="subject"],[name="number"],[name="message"]'),
            e(u).val() && e(u).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) ? (e(u).removeClass("is-invalid"),
            n = !0) : (e(u).addClass("is-invalid"),
            n = !1);
            return n
        }
        )() && jQuery.ajax({
            url: e(d).attr("action"),
            data: t,
            type: "POST"
        }).done((function(t) {
            p.removeClass("error"),
            p.addClass("success"),
            p.text(t),
            e(d + ' input:not([type="submit"]),' + d + " textarea").val("")
        }
        )).fail((function(e) {
            p.removeClass("success"),
            p.addClass("error"),
            "" !== e.responseText ? p.html(e.responseText) : p.html("Oops! An error occured and your message could not be sent.")
        }
        ))
    }
    function h(t, n, o, a) {
        e(n).on("click", (function(n) {
            n.preventDefault(),
            e(t).addClass(a)
        }
        )),
        e(t).on("click", (function(n) {
            n.stopPropagation(),
            e(t).removeClass(a)
        }
        )),
        e(t + " > div").on("click", (function(n) {
            n.stopPropagation(),
            e(t).addClass(a)
        }
        )),
        e(o).on("click", (function(n) {
            n.preventDefault(),
            n.stopPropagation(),
            e(t).removeClass(a)
        }
        ))
    }
    function h(t, n, o, a) {
        e(n).on("click", (function(n) {
            n.preventDefault(),
            e(t).addClass(a)
        }
        )),
        e(t).on("click", (function(n) {
            n.stopPropagation(),
            e(t).removeClass(a)
        }
        )),
        e(t + " > div").on("click", (function(n) {
            n.stopPropagation(),
            e(t).addClass(a)
        }
        )),
        e(o).on("click", (function(n) {
            n.preventDefault(),
            n.stopPropagation(),
            e(t).removeClass(a)
        }
        ))
    }
    function m(t, n, o, a) {
        var s = t.text().split(n)
          , i = "";
        s.length && (e(s).each((function(e, t) {
            i += '<span class="' + o + (e + 1) + '">' + t + "</span>" + a
        }
        )),
        t.empty().append(i))
    }
    e(d).on("submit", (function(e) {
        e.preventDefault(),
        g()
    }
    )),
    r = ".popup-search-box",
    l = ".searchClose",
    c = "show",
    e(".searchBoxToggler").on("click", (function(t) {
        t.preventDefault(),
        e(r).addClass(c)
    }
    )),
    e(r).on("click", (function(t) {
        t.stopPropagation(),
        e(r).removeClass(c)
    }
    )),
    e(r).find("form").on("click", (function(t) {
        t.stopPropagation(),
        e(r).addClass(c)
    }
    )),
    e(l).on("click", (function(t) {
        t.preventDefault(),
        t.stopPropagation(),
        e(r).removeClass(c)
    }
    )),
    h(".sidemenu-wrapper", ".sideMenuToggler", ".sideMenuCls", "show"),
    h(".shopping-cart", ".sideMenuToggler2", ".sideMenuCls", "show"),
    e(".th-popup-image").magnificPopup({
        type: "image",
        mainClass: "mfp-zoom-in",
        removalDelay: 260,
        gallery: {
            enabled: !0
        }
    }),
    e(".popup-video").magnificPopup({
        type: "iframe",
        mainClass: "mfp-zoom-in",
        removalDelay: 260
    }),
    e(".popup-content").magnificPopup({
        type: "inline",
        midClick: !0
    }),
    e("[data-theme-color]").length > 0 && e("[data-theme-color]").each((function() {
        var t = e(this).attr("data-theme-color");
        e(this).get(0).style.setProperty("--theme-color", t),
        e(this).removeAttr("data-theme-color")
    }
    ));
    var f = {
        init: function() {
            return this.each((function() {
                m(e(this), "", "char", "")
            }
            ))
        },
        words: function() {
            return this.each((function() {
                m(e(this), " ", "word", " ")
            }
            ))
        },
        lines: function() {
            return this.each((function() {
                var t = "eefec303079ad17405c889e092e105b0";
                m(e(this).children("br").replaceWith(t).end(), t, "line", "")
            }
            ))
        }
    };
    function v(e) {
        return parseInt(e, 10)
    }
    e.fn.lettering = function(t) {
        return t && f[t] ? f[t].apply(this, [].slice.call(arguments, 1)) : "letters" !== t && t ? (e.error("Method " + t + " does not exist on jQuery.lettering"),
        this) : f.init.apply(this, [].slice.call(arguments, 0))
    }
    ,
    e(".discount-anime").lettering(),
    e.fn.sectionPosition = function(t, n) {
        e(this).each((function() {
            var o, a, s, i, r, l = e(this);
            o = Math.floor(l.height() / 2),
            a = l.attr(t),
            s = l.attr(n),
            i = v(e(s).css("padding-top")),
            r = v(e(s).css("padding-bottom")),
            "top-half" === a ? (e(s).css("padding-bottom", r + o + "px"),
            l.css("margin-top", "-" + o + "px")) : "bottom-half" === a && (e(s).css("padding-top", i + o + "px"),
            l.css("margin-bottom", "-" + o + "px"))
        }
        ))
    }
    ;
    e("[data-sec-pos]").length && e("[data-sec-pos]").imagesLoaded((function() {
        e("[data-sec-pos]").sectionPosition("data-sec-pos", "data-pos-for")
    }
    )),
    e(".filter-active").imagesLoaded((function() {
        var t = ".filter-active";
        if (e(t).length > 0) {
            var n = e(t).isotope({
                itemSelector: ".filter-item",
                filter: "*",
                masonry: {
                    columnWidth: 1
                }
            });
            e(".filter-menu-active").on("click", "button", (function() {
                var t = e(this).attr("data-filter");
                n.isotope({
                    filter: t
                })
            }
            )),
            e(".filter-menu-active").on("click", "button", (function(t) {
                t.preventDefault(),
                e(this).addClass("active"),
                e(this).siblings(".active").removeClass("active")
            }
            ))
        }
        e(".load-more-btn").on("click", (function() {
            var n = e(this).find("i");
            n.addClass("fa-spin-pulse"),
            setTimeout((function() {
                n.removeClass("fa-spin-pulse")
            }
            ), 1e3);
            var o = e(this);
            setTimeout((function() {
                var n = o.prev(".load-more-active");
                0 === n.length && (n = o.closest(".container").find(".load-more-active")),
                n.find(".load-more.d-none, .accordion-card.style2.d-none, .filter-item.d-none").removeClass("d-none");
                e(t).isotope({
                    filter: "*"
                })
            }
            ), 700)
        }
        )),
        e(".plus-button").on("click", (function() {
            var t = e(this)
              , n = t.find("i");
            n.addClass("fa-plus"),
            setTimeout((function() {
                n.removeClass("fa-spin-plus")
            }
            ), 1e3),
            t.closest(".slider-counter-wrapp").find(".popup-more").removeClass("d-none")
        }
        )),
        e(".popup-close").on("click", (function() {
            e(this).closest(".popup-more").addClass("d-none")
        }
        ))
    }
    )),
    e(".masonary-active").imagesLoaded((function() {
        e(".masonary-active").length > 0 && e(".masonary-active").isotope({
            itemSelector: ".filter-item",
            filter: "*",
            masonry: {
                columnWidth: 1
            }
        })
    }
    )),
    e(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded((function() {
        var t = ".masonary-active, .woocommerce-Reviews .comment-list";
        e(t).length > 0 && e(t).isotope({
            itemSelector: ".filter-item, .woocommerce-Reviews .comment-list li",
            filter: "*",
            masonry: {
                columnWidth: 1
            }
        }),
        e('[data-bs-toggle="tab"]').on("shown.bs.tab", (function(n) {
            e(t).isotope({
                filter: "*"
            })
        }
        ))
    }
    )),
    e(".counter-number").counterUp({
        delay: 10,
        time: 1e3
    }),
    e.fn.shapeMockup = function() {
        e(this).each((function() {
            var t = e(this)
              , n = t.data("top")
              , o = t.data("right")
              , a = t.data("bottom")
              , s = t.data("left");
            t.css({
                top: n,
                right: o,
                bottom: a,
                left: s
            }).removeAttr("data-top").removeAttr("data-right").removeAttr("data-bottom").removeAttr("data-left").parent().addClass("shape-mockup-wrap")
        }
        ))
    }
    ,
    e(".shape-mockup") && e(".shape-mockup").shapeMockup(),
    e.fn.shapeMockup2 = function() {
        e(this).each((function() {
            var t = e(this)
              , n = t.data("top")
              , o = t.data("right")
              , a = t.data("bottom")
              , s = t.data("left");
            t.css({
                top: n,
                right: o,
                bottom: a,
                left: s
            }).removeAttr("data-top").removeAttr("data-right").removeAttr("data-bottom").removeAttr("data-left").parent().addClass("shape-mockup-wrap2")
        }
        ))
    }
    ,
    e(".shape-mockup2") && e(".shape-mockup2").shapeMockup2(),
    e(".price_slider").slider({
        range: !0,
        min: 10,
        max: 100,
        values: [10, 75],
        slide: function(t, n) {
            e(".from").text("$" + n.values[0]),
            e(".to").text("$" + n.values[1])
        }
    }),
    e(".from").text("$" + e(".price_slider").slider("values", 0)),
    e(".to").text("$" + e(".price_slider").slider("values", 1)),
    e(".progress-bar").waypoint((function() {
        e(".progress-bar").css({
            animation: "animate-positive 1.8s",
            opacity: "1"
        })
    }
    ), {
        offset: "75%"
    });
    const y = e(".panorama-img");
    if (y.length > 0) {
        const t = e(".image-container")
          , n = new PANOLENS.Viewer({
            container: t.get(0),
            autoRotate: !0,
            autoRotateSpeed: .5,
            controlBar: !1
        });
        y.each((function() {
            const t = e(this).attr("src")
              , o = new PANOLENS.ImagePanorama(t);
            n.add(o)
        }
        ))
    }
    e(".th-screen").length && e(window).on("scroll", (function() {
        !function(t, n=0) {
            var o = e(window).scrollTop()
              , a = o + e(window).height()
              , s = e(t).offset().top;
            return s + e(t).height() - parseInt(n) <= a && s >= o
        }(".th-screen", 200) ? e(".th-screen").removeClass("th-visible") : e(".th-screen").addClass("th-visible")
    }
    )),
    e("#ship-to-different-address-checkbox").on("change", (function() {
        e(this).is(":checked") ? e("#ship-to-different-address").next(".shipping_address").slideDown() : e("#ship-to-different-address").next(".shipping_address").slideUp()
    }
    )),
    e(".woocommerce-form-login-toggle a").on("click", (function(t) {
        t.preventDefault(),
        e(".woocommerce-form-login").slideToggle()
    }
    )),
    e(".woocommerce-form-coupon-toggle a").on("click", (function(t) {
        t.preventDefault(),
        e(".woocommerce-form-coupon").slideToggle()
    }
    )),
    e(".shipping-calculator-button").on("click", (function(t) {
        t.preventDefault(),
        e(this).next(".shipping-calculator-form").slideToggle()
    }
    )),
    e('.wc_payment_methods input[type="radio"]:checked').siblings(".payment_box").show(),
    e('.wc_payment_methods input[type="radio"]').each((function() {
        e(this).on("change", (function() {
            e(".payment_box").slideUp(),
            e(this).siblings(".payment_box").slideDown()
        }
        ))
    }
    )),
    e(".rating-select .stars a").each((function() {
        e(this).on("click", (function(t) {
            t.preventDefault(),
            e(this).siblings().removeClass("active"),
            e(this).parent().parent().addClass("selected"),
            e(this).addClass("active")
        }
        ))
    }
    )),
    e(".quantity-plus").each((function() {
        e(this).on("click", (function(t) {
            t.preventDefault();
            var n = e(this).siblings(".qty-input")
              , o = parseInt(n.val(), 10);
            isNaN(o) || n.val(o + 1)
        }
        ))
    }
    )),
    e(".quantity-minus").each((function() {
        e(this).on("click", (function(t) {
            t.preventDefault();
            var n = e(this).siblings(".qty-input")
              , o = parseInt(n.val(), 10);
            !isNaN(o) && o > 1 && n.val(o - 1)
        }
        ))
    }
    )),
    e(".color-switch-btns button").each((function() {
        const t = e(this)
          , n = t.data("color");
        t.css("--theme-color", n),
        t.on("click", (function() {
            const t = e(this).data("color");
            e("body").css("--theme-color", t)
        }
        ))
    }
    )),
    e("[theme-color]").length > 0 && e("[theme-color]").each((function() {
        var t = e(this).attr("theme-color");
        e(this).get(0).style.setProperty("--theme-color", t),
        e(this).removeAttr("theme-color")
    }
    )),
    e("[title-color]").length > 0 && e("[title-color]").each((function() {
        var t = e(this).attr("title-color");
        e(this).get(0).style.setProperty("--title-color", t),
        e(this).removeAttr("title-color")
    }
    )),
    e(document).on("click", ".switchIcon", (function() {
        e(".color-scheme-wrap").toggleClass("active")
    }
    ));
    var b = document.getElementById("filt-monthly")
      , w = document.getElementById("filt-yearly")
      , C = document.getElementById("switcher")
      , k = document.getElementById("monthly")
      , x = document.getElementById("yearly");
    e(".pricing-tabs").length && (b.addEventListener("click", (function() {
        C.checked = !1,
        b.classList.add("toggler--is-active"),
        w.classList.remove("toggler--is-active"),
        k.classList.remove("hide"),
        x.classList.add("hide")
    }
    )),
    w.addEventListener("click", (function() {
        C.checked = !0,
        w.classList.add("toggler--is-active"),
        b.classList.remove("toggler--is-active"),
        k.classList.add("hide"),
        x.classList.remove("hide")
    }
    )),
    C.addEventListener("click", (function() {
        w.classList.toggle("toggler--is-active"),
        b.classList.toggle("toggler--is-active"),
        k.classList.toggle("hide"),
        x.classList.toggle("hide")
    }
    )));
    new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !0,
        live: !0
    });
    if ((new WOW).init(),
    e(".reveal").length) {
        gsap.registerPlugin(ScrollTrigger),
        document.querySelectorAll(".reveal").forEach(e => {
            let t = e.querySelector("img")
              , n = gsap.timeline({
                scrollTrigger: {
                    trigger: e,
                    toggleActions: "play none none none"
                }
            });
            n.set(e, {
                autoAlpha: 1
            }),
            n.from(e, 1, {
                xPercent: -100,
                ease: Power2.out
            }),
            n.from(t, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            })
        }
        )
    }
    if (e(".text-anime").length) {
        document.querySelectorAll(".text-anime").forEach(e => {
            e.animation && (e.animation.progress(1).kill(),
            e.split.revert()),
            e.split = new SplitText(e,{
                type: "lines,words,chars",
                linesClass: "split-line"
            }),
            gsap.set(e, {
                perspective: 400
            }),
            gsap.set(e.split.chars, {
                opacity: 0,
                x: "50"
            }),
            e.animation = gsap.to(e.split.chars, {
                scrollTrigger: {
                    trigger: e,
                    start: "top 90%"
                },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: .02
            })
        }
        )
    }
    gsap.registerPlugin(ScrollTrigger);
    new SplitType(".title-ani",{
        types: "chars"
    });
    if (gsap.registerPlugin(ScrollTrigger),
    gsap.registerPlugin(ScrollTrigger, SplitText),
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".split-text").forEach(e => {
            e._split && (e._split.revert(),
            e._split = null);
            const t = new SplitText(e,{
                type: "words"
            });
            e._split = t,
            gsap.set(t.words, {
                opacity: 0,
                scale: e => e % 2 == 0 ? 0 : 2,
                transformOrigin: "center center"
            }),
            gsap.to(t.words, {
                scrollTrigger: {
                    trigger: e,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none none",
                    onEnter: () => ScrollTrigger.refresh()
                },
                opacity: 1,
                scale: 1,
                duration: .8,
                stagger: .05,
                ease: "power2.out",
                onComplete: () => ScrollTrigger.refresh()
            })
        }
        ),
        ScrollTrigger.refresh()
    }
    ),
    document.querySelectorAll(".hover-reveal").length > 0) {
        document.querySelectorAll(".hover-reveal").forEach( (e, t) => {
            e.addEventListener("mousemove", t => {
                setInterval(function(e, t) {
                    const n = t.getBoundingClientRect()
                      , o = e.clientX - n.x
                      , a = e.clientY - n.y;
                    t.children[0] && (t.children[0].style.transform = `translate(${o}px, ${a}px)`)
                }(t, e), 100)
            }
            )
        }
        )
    }
    if (e(".gallery-row").length > 0) {
        document.querySelectorAll(".gallery-row .gallery-box").forEach(e => {
            gsap.set(e, {
                scale: 0
            }),
            gsap.to(e, {
                duration: 1.2,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: e,
                    start: "top bottom-=100",
                    end: "bottom top+=100",
                    toggleActions: "play reverse play reverse"
                }
            })
        }
        )
    }
    if (document.querySelectorAll(".cursor , cursor2").length > 0) {
        var T = e(".cursor")
          , S = e(".cursor2")
          , E = 0
          , L = 0
          , A = 0
          , P = 0;
        TweenMax.to({}, .016, {
            repeat: -1,
            onRepeat: function() {
                E += (A - E) / 9,
                L += (P - L) / 9,
                TweenMax.set(S, {
                    css: {
                        left: E - 12,
                        top: L - 12
                    }
                }),
                TweenMax.set(T, {
                    css: {
                        left: A,
                        top: P
                    }
                })
            }
        }),
        e(document).on("mousemove", (function(e) {
            A = e.clientX,
            P = e.clientY
        }
        )),
        e(".btn").on("mouseenter", (function() {
            T.addClass("active"),
            S.addClass("active")
        }
        )),
        e(".btn").on("mouseleave", (function() {
            T.removeClass("active"),
            S.removeClass("active")
        }
        ))
    }
    if (e(".cursor-picture").length && document.querySelectorAll(".cursor-picture").length) {
        const e = document.querySelectorAll(".cursor-picture")
          , t = document.querySelector(".gsap-cursor");
        let n = 0
          , o = 0
          , a = 0;
        const s = 100
          , i = new Set;
        let r = 0
          , l = 0
          , c = !1
          , d = !1;
        t.style.position = "relative",
        gsap.timeline({
            onComplete: () => {
                d = !0
            }
        }),
        t.addEventListener("mousemove", e => {
            d && (r = e.clientX - t.getBoundingClientRect().left,
            l = e.clientY - t.getBoundingClientRect().top,
            c = !0)
        }
        ),
        gsap.ticker.add( () => {
            if (!c || !d)
                return;
            if (c = !1,
            Math.hypot(r - n, l - o) < s)
                return;
            n = r,
            o = l,
            a >= e.length && (a = 0);
            const t = e[a++];
            i.has(t) || (i.add(t),
            gsap.set(t, {
                position: "absolute",
                left: r - t.naturalWidth / 2 + "px",
                top: l - t.naturalHeight / 2 + "px",
                scale: .8,
                opacity: 0,
                pointerEvents: "none",
                zIndex: 9999
            }),
            gsap.timeline().to(t, {
                opacity: 1,
                scale: 1,
                duration: .3,
                ease: "power2.out"
            }).to(t, {
                opacity: 1,
                duration: .1
            }).to(t, {
                opacity: 0,
                scale: .8,
                duration: .3,
                ease: "power2.in"
            }).call( () => {
                i.delete(t)
            }
            ))
        }
        )
    }
    gsap.registerPlugin(ScrollTrigger);
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (e(".th-port-slider-title").on("mouseenter", (function() {
        e("#th-port-slider-wrap").removeClass().addClass(e(this).attr("rel")),
        e(this).addClass("active").siblings().removeClass("active")
    }
    )),
    gsap.registerPlugin(ScrollTrigger),
    window.addEventListener("load", () => {
        const e = ["polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)", "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)", "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)", "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)", "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)", "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)", "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)", "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)", "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)"]
          , t = ["polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)", "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)", "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)", "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)", "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)", "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)", "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)", "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)", "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)"];
        document.querySelectorAll(".th-clip-anim").forEach(e => {
            const t = e.querySelector(".th-anim-img[data-animate='true']");
            if (!t)
                return;
            const n = t.src;
            e.querySelectorAll(".mask").forEach(e => e.remove());
            for (let t = 0; t < 9; t++) {
                const o = document.createElement("div");
                o.className = "mask mask-" + (t + 1),
                Object.assign(o.style, {
                    backgroundImage: `url(${n})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    inset: "0"
                }),
                e.appendChild(o)
            }
        }
        ),
        gsap.utils.toArray(".th-clip-anim").forEach(n => {
            const o = n.querySelectorAll(".mask");
            if (!o.length)
                return;
            gsap.set(o, {
                clipPath: t => e[t]
            });
            const a = gsap.timeline({
                scrollTrigger: {
                    trigger: n,
                    start: "top 75%"
                }
            });
            [[".mask-1"], [".mask-2", ".mask-4"], [".mask-3", ".mask-5", ".mask-7"], [".mask-6", ".mask-8"], [".mask-9"]].forEach( (e, s) => {
                const i = e.map(e => n.querySelector(e)).filter(e => e);
                i.length && a.to(i, {
                    clipPath: (e, n) => t[Array.from(o).indexOf(n)],
                    duration: 1,
                    ease: "power4.out",
                    stagger: .1
                }, .125 * s)
            }
            )
        }
        )
    }
    ),
    e(document).ready((function() {
        let t = 0
          , n = 0;
        e(".choose-progress-bar .progress-fill .counter").each((function() {
            let o = e(this).text().trim()
              , a = parseInt(o);
            t += a,
            n++;
            let s = e(this).closest(".progress-fill")[0];
            gsap.to(s, {
                height: a + "%",
                duration: 1.8,
                ease: "bounce.out",
                delay: .2 * n,
                onStart: function() {
                    gsap.fromTo(s, {
                        scaleY: .6,
                        transformOrigin: "bottom"
                    }, {
                        scaleY: 1,
                        duration: .8,
                        ease: "power2.out"
                    })
                }
            })
        }
        ));
        let o = Math.round(t / n) + "%";
        e("#progress-counter").text(o),
        gsap.fromTo("#progress-counter", {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 1.5
        })
    }
    )),
    e("#play_button").length > 0) {
        let e = document.querySelector("video")
          , t = document.getElementById("play_button")
          , n = document.getElementById("pause_button");
        t.addEventListener("click", (function() {
            e.play(),
            t.classList.add("vplay"),
            n.classList.remove("vpause"),
            document.querySelector("html").classList.add("playvideo")
        }
        )),
        n.addEventListener("click", (function() {
            e.pause(),
            t.classList.remove("vplay"),
            n.classList.add("vpause")
        }
        ));
        let o = document.getElementById("sound-off")
          , a = document.getElementById("sound-on")
          , s = document.querySelector(".sound-ctrl");
        o.addEventListener("click", (function() {
            e.muted = !0,
            s.classList.add("soundctrlshow")
        }
        )),
        a.addEventListener("click", (function() {
            e.muted = !1,
            s.classList.remove("soundctrlshow")
        }
        )),
        e.onended = function() {
            document.querySelector("html").classList.remove("playvideo"),
            t.classList.remove("vplay")
        }
    }
    e(".hero-item").on("mouseenter", (function() {
        e(this).addClass("active").siblings(".hero-item").removeClass("active")
    }
    )),
    gsap.registerPlugin(ScrollTrigger),
    document.addEventListener("DOMContentLoaded", (function() {
        if (window.innerWidth <= 768)
            return;
        const e = document.querySelectorAll(".cta-wrapp .cta-item");
        if (e.length > 0) {
            const t = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cta-wrapp",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    markers: !1
                },
                defaults: {
                    ease: "power1.out",
                    duration: 1
                }
            });
            e.forEach( (e, n) => {
                let o = 0
                  , a = 0;
                0 === n && (o = 150,
                a = 0),
                1 === n && (o = 60,
                a = 10),
                2 === n && (o = -80,
                a = -10),
                3 === n && (o = -180,
                a = 0),
                t.from(e, {
                    xPercent: o,
                    rotate: a
                }, "<")
            }
            )
        }
    }
    ));
    let q = null;
    function M() {
        window.innerWidth < 526 ? q && (q.scrollTrigger.kill(),
        q = null) : q || "undefined" != typeof gsap && document.querySelector(".video-trigger-thumb") && (q = gsap.to(".video-trigger-thumb", {
            duration: 2,
            scale: 1,
            borderRadius: "0%",
            width: "100%",
            top: "0",
            ease: "linear",
            scrollTrigger: {
                trigger: ".video-trigger-thumb",
                markers: !1,
                start: "top center",
                end: "top",
                scrub: 1
            }
        }))
    }
    window.addEventListener("load", M),
    window.addEventListener("resize", M),
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".rotating-slider").forEach(e => {
            const t = e.querySelector(".rotating-slider__wrapper")
              , n = e.querySelector(".rotating-slider__list")
              , o = e.querySelector(".rotating-slider__live")
              , a = Array.from(e.querySelectorAll(".rotating-slider__slide"))
              , s = e.querySelector(".rotating-slider__prev")
              , i = e.querySelector(".rotating-slider__next");
            if (!t || 0 === a.length)
                return void console.warn("⚠️ No slides found inside one of the sliders");
            let r = 0;
            const l = () => {
                a.forEach( (e, t) => {
                    e.classList.toggle("active", t === r),
                    e.tabIndex = t === r ? 0 : -1,
                    e.setAttribute("aria-hidden", t !== r)
                }
                ),
                t.style.transform = `translateX(-${530 * r}px)`,
                n && (n.innerHTML = a.map(e => `<span>${e.getAttribute("data-title") || ""}</span>`).join(""),
                n.style.transform = `translateY(-${88 * r}px)`),
                s && s.classList.toggle("hidden", 0 === r),
                i && i.classList.toggle("hidden", r === a.length - 1),
                ( () => {
                    if (!o)
                        return;
                    const e = a[r].getAttribute("data-title") || "";
                    o.textContent = `Slide ${r + 1}: ${e}`
                }
                )()
            }
            ;
            s && s.addEventListener("click", () => {
                r > 0 && (r--,
                l())
            }
            ),
            i && i.addEventListener("click", () => {
                r < a.length - 1 && (r++,
                l())
            }
            ),
            e.addEventListener("keydown", e => {
                "ArrowRight" === e.key && r < a.length - 1 ? (r++,
                l()) : "ArrowLeft" === e.key && r > 0 && (r--,
                l())
            }
            ),
            l()
        }
        )
    }
    ),
   
    document.onkeydown = function(e) {
        return 123 != event.keyCode && ((!e.ctrlKey || !e.shiftKey || e.keyCode != "I".charCodeAt(0)) && ((!e.ctrlKey || !e.shiftKey || e.keyCode != "C".charCodeAt(0)) && ((!e.ctrlKey || !e.shiftKey || e.keyCode != "J".charCodeAt(0)) && ((!e.ctrlKey || e.keyCode != "U".charCodeAt(0)) && void 0))))
    }
}(jQuery);
