{
    /*
    * SP時に横スライドするナビゲーション
    --- */

    // 設定
    let windowWidth = '';
    const documentHeight = $('body').outerHeight(true);

    // スクロールで点灯させる箇所のidを設定
    let array = {
        '#service': 0,
        '#case': 0,
        '#member': 0,
        '#interview': 0,
        '#voc': 0,
        '#contact': 0
    };
    let $globalNavi = [];
    let key = '';

    // ナビゲーションの横幅を取得
    let item = [];
    let scrollData = '';
    let scrollCurrent = '';

    const navCurrent = '[data-nav-current]';
    const IS_CURRENT = 'is-current';
    const $dataScroll = $('[data-nav-scroll]');
    const breakPoint = 1024;

    // スクロールが停止した際のトリガーを作成
    // https://www.allinthemind.biz/markup/javascript/jquery-custom-event.html
    let newEvent = new $.Event('scrollStop'), timer;
    function newEventTrigger() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            $(window).trigger(newEvent)
        }, 100);
    }
    $(window).on('scroll', newEventTrigger);

    const slideNav = () => {
        $(window).on('load resize', function () {
            // 画面幅を取得
            windowWidth = window.innerWidth;

            $(navCurrent).each(function (value) {
                item.push($(this).outerWidth());
            });

            // カレント判定位置をPCとSPで分ける
            if (windowWidth < breakPoint) {
                scrollData = 10;
                scrollCurrent = 50;
            } else {
               scrollData = 110;
               scrollCurrent = 150;
           }

            // ナビゲーションが横スクロールするようにpaddingを付与
            const lastItem = 'calc(100% - ' + item.slice(-1)[0] + 'px - 10px)';
            if (windowWidth < breakPoint) {
                $('[data-nav-scroll] li:last-child').css({'padding-right': lastItem});
            }
        });

        // 各要素のスクロール値を保存
        const getKey = () => {
            for (key in array) {
                if ($(key).offset()) {
                    array[key] = $(key).offset().top - scrollData;
                    $globalNavi[key] = $(navCurrent + '[href="' + key + '"]');
                }
            }
        }

        // カレント判定
        const decisionKey = () => {
            getKey();

            for (key in array) {
                if ($(window).scrollTop() > array[key] - scrollCurrent) {
                    $(navCurrent).each(function () {
                        $(this).removeClass(IS_CURRENT);
                    });
                    $globalNavi[key].addClass(IS_CURRENT);
                }
            }
        }

        $(window).on('load, scroll', function () {
            decisionKey();
        });
    }

    const slideNavAction = () => {
        windowWidth = window.innerWidth;
        let slide = '';

        // スクロール停止時にcurrent表示のナビまで横スクロール
        $(window).on('scrollStop', function () {
            if (windowWidth < breakPoint) {
                const speed = 300;
                const animateSetting = $dataScroll.animate({scrollLeft: slide}, speed, 'swing');

                if ($('[data-nav-current="service"].' + IS_CURRENT).length) {
                    slide = 0;
                    animateSetting();
                } else if ($('[data-nav-current="case"].' + IS_CURRENT).length) {
                    slide = item[0];
                    animateSetting();
                } else if ($('[data-nav-current="member"].' + IS_CURRENT).length) {
                    slide = item[0] + item[1];
                    animateSetting();
                } else if ($('[data-nav-current="interview"].' + IS_CURRENT).length) {
                    slide = item[0] + item[1] + item[2];
                    animateSetting();
                } else if ($('[data-nav-current="voc"].' + IS_CURRENT).length) {
                    slide = item[0] + item[1] + item[2] + item[3];
                    animateSetting();
                } else if ($('[data-nav-current="contact"].' + IS_CURRENT).length) {
                    slide = item[0] + item[1] + item[2] + item[3] + item[4];
                    animateSetting();
                } else if (documentHeight < 100) {
                    slide = 0;
                    animateSetting();
                }
            }
        });

        // クリック時にcurrent表示のナビまで横スクロール
        $(navCurrent).on('click', function () {
            if (windowWidth < breakPoint) {
                setTimeout(function () {
                    const speed = 100;
                    const animateSetting = $dataScroll.animate({scrollLeft: slide}, speed, 'swing');

                    if ($('[data-nav-current="service"].' + IS_CURRENT).length) {
                        slide = 0;
                        animateSetting();
                    } else if ($('[data-nav-current="case"].' + IS_CURRENT).length) {
                        slide = item[0];
                        animateSetting();
                    } else if ($('[data-nav-current="member"].' + IS_CURRENT).length) {
                        slide = item[0] + item[1];
                        animateSetting();
                    } else if ($('[data-nav-current="interview"].' + IS_CURRENT).length) {
                        slide = item[0] + item[1] + item[2];
                        animateSetting();
                    } else if ($('[data-nav-current="voc"].' + IS_CURRENT).length) {
                        slide = item[0] + item[1] + item[2] + item[3];
                        animateSetting();
                    } else if ($('[data-nav-current="contact"].' + IS_CURRENT).length) {
                        slide = item[0] + item[1] + item[2] + item[3] + item[4];
                        animateSetting();
                    }
                }, 400);
            }
        });
    }

    /*
    * スムーズスクロール
    --- */
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

    document.addEventListener('DOMContentLoaded', slideNav);
    window.addEventListener('load', slideNavAction);
    window.addEventListener('resize', slideNavAction);
    smoothScroll();
}