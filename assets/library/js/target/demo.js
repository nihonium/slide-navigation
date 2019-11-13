{
    const slideNav = () => {
        let windowWidth = '';
        const documentHeight = $('body').outerHeight(true);

        $(window).on('load resize', function () {
            windowWidth = window.innerWidth;
        });

        // スクロールで点灯させる箇所のidを取得する
        let array = {
            '#service': 0,
            '#case': 0,
            '#member': 0,
            '#interview': 0,
            '#voc': 0,
            '#contact': 0
        };
        let $globalNavi = new Array();
        let key = '';
        // const dataSection = $('[data-section]').length;

        // ナビゲーションの横幅を取得
        let item = [];
        let scrollData = '';
        let scrollCurrent = '';
        $(window).on('load resize', function() {

            if (windowWidth < 1024) {
                $('[data-nav-current]').each(function(value) {
                    item.push($(this).outerWidth());
                });
                scrollData = 10;
                scrollCurrent = 50;
            // カレント判定位置をPCとSPで分ける
            } else {
               scrollData = 110;
               scrollCurrent = 150;
           }
        });

        // 各要素のスクロール値を保存
        const getKey = () => {
            for (key in array) {
                if ($(key).offset()) {
                    array[key] = $(key).offset().top - scrollData;
                    $globalNavi[key] = $('[data-nav-current][href="' + key + '"]');
                }
            }
        }

        // ページロード時にカレント判定
        const setKey = () => {
            getKey();
            for (key in array) {
                if ($(window).scrollTop() > array[key] - scrollCurrent) {
                    $('[data-nav-current]').each(function () {
                        $(this).removeClass('is-current');
                    });
                    $globalNavi[key].addClass('is-current');
                }
            }
        }

        $(window).on('load', function () {
            setKey();
        });

        // スクロールイベントでカレント判定
        $(window).scroll(function () {
            setKey();

            if ($(window).scrollTop() === 0) {
                $('[data-nav-current="service"]').removeClass("is-current");
            }
        });

        // スクロールが停止した際のトリガーを作成
        // https://www.allinthemind.biz/markup/javascript/jquery-custom-event.html
        let newEvent = new $.Event('scrollstop'), timer;

        function newEventTrigger() {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $(window).trigger(newEvent)
            }, 100);
        }
        $(window).on('scroll', newEventTrigger);


        $(window).on('scrollstop', function () {
            if (windowWidth < 1024) {
                let slide = '';
                const speed = 300;

                if ($('[data-nav-current="service"].is-current').length) {
                    slide = 0;
                    $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="case"].is-current').length) {
                    slide = item[0];
                    $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="member"].is-current').length) {
                    slide = item[0] + item[1];
                    $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="interview"].is-current').length) {
                    slide = item[0] + item[1] + item[2];
                    $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="voc"].is-current').length) {
                    slide = item[0] + item[1] + item[2] + item[3];
                    $('[data-nav-scroll]').animate({ scrollLeft: slide }, speed, 'swing');
                } else if ($('[data-nav-current="contact"].is-current').length) {
                    slide = item[0] + item[1] + item[2] + item[3] + item[4];
                    $('[data-nav-scroll]').animate({ scrollLeft: slide }, speed, 'swing');
                } else if (documentHeight < 100) {
                    slide = 0;
                    $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                }
            }
        });

        // クリック時にcurrent表示のナビまで横スクロール
        $('[data-nav-current]').on('click', function () {
            if (windowWidth < 1024) {
                setTimeout(function () {
                    let slide = '';
                    const speed = 100;

                    if ($('[data-nav-current="service"].is-current').length) {
                        slide = 0;
                        $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                    } else if ($('[data-nav-current="case"].is-current').length) {
                        slide = item[0];
                        $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                    } else if ($('[data-nav-current="member"].is-current').length) {
                        slide = item[0] + item[1];
                        $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                    } else if ($('[data-nav-current="interview"].is-current').length) {
                        slide = item[0] + item[1] + item[2];
                        $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                    } else if ($('[data-nav-current="voc"].is-current').length) {
                        slide = item[0] + item[1] + item[2] + item[3];
                        $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                    } else if ($('[data-nav-current="contact"].is-current').length) {
                        slide = item[0] + item[1] + item[2] + item[3] + item[4];
                        $('[data-nav-scroll]').animate({scrollLeft: slide}, speed, 'swing');
                    }
                }, 400);
            }
        });
    }

    const smoothScroll = () => {
        $('[data-scroll]').on('click', function () {
            const speed = 500;
            const $self = $(this);
            const $href = $self.attr('href');
            const $margin = $self.attr('data-scroll') ? parseInt($self.attr('data-scroll')) : 0;
            const $target = $($href);
            const pos = ($target[0] && $target !== '#page_top') ? $target.offset().top - $margin : 0;

            $('html, body').animate({scrollTop: pos}, speed, 'swing');
            $self.blur();

            return false;
        });
    }

    slideNav();
    smoothScroll();
}