/* ==================================
 * SP時に横スライドするナビゲーション
   ================================== */

{
    // ターゲット・ブレイクポイントの指定
    const DATA_CURRENT = '[data-nav-current]';
    const CLASS_CURRENT = 'is-current';
    const $dataScroll = $('[data-nav-scroll]');
    const BREAK_POINT = 1024;

    /*
     * カレントの設定
     */
    const currentSetting = () => {
        let scrollData = '';
        let scrollCurrent = '';
        let array = {};
        let globalNav = [];
        let key = '';

        // スクロールで点灯させる箇所のidを設定
        $('[data-section]').each(function (ele) {
            let idSet = '#' + $(this).attr('id');
            array[idSet] = 0;
        });

        $(window).on('load resize', function () {
            // 画面幅を取得
            const windowWidth = window.innerWidth;

            // PCとSPでカレント余白を変更
            if (windowWidth < BREAK_POINT) {
                scrollData = 10;
                scrollCurrent = 50;
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
                    globalNav[key] = $(DATA_CURRENT + '[href="' + key + '"]');
                }
            }
        }

        // カレント用Classの付与・削除
        const decisionKey = () => {
            getKey();

            for (key in array) {
                if ($(window).scrollTop() > array[key] - scrollCurrent) {
                    $(DATA_CURRENT).each(function () {
                        $(this).removeClass(CLASS_CURRENT);
                    });
                    globalNav[key].addClass(CLASS_CURRENT);
                }
            }
        }

        $(window).on('load, scroll', function () {
            decisionKey();
        });
    }

    /*
     * ナビゲーションの設定
     */
    const slideNavSetting = () => {
        // ナビゲーションの横幅を格納
        let item = [];

        // スクロールが停止した際のトリガーを作成
        // https://www.allinthemind.biz/markup/javascript/jquery-custom-event.html
        let newEvent = new $.Event('scrollStop'), timer;
        function newEventTrigger() {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $(window).trigger(newEvent)
            }, 50);
        }
        $(window).on('scroll', newEventTrigger);

        // ナビゲーションが横スクロールするようにpaddingを付与
        $(window).on('load resize', function () {
            // 画面幅を取得
            const windowWidth = window.innerWidth;

            $(DATA_CURRENT).each(function (value) {
                item.push($(this).outerWidth());
            });

            const lastItem = 'calc(100% - ' + item.slice(-1)[0] + 'px - 10px)';
            if (windowWidth < BREAK_POINT) {
                $('[data-nav-scroll] li:last-child').css({'padding-right': lastItem});
            }
        });

        // スクロール停止時にcurrent表示のナビまで横スクロール
        $(window).on('scrollStop', function () {
            const windowWidth = window.innerWidth;

            if (windowWidth < BREAK_POINT) {
                let slide = '';
                const speed = 300;
                const documentHeight = $('body').outerHeight(true);

                if ($('[data-nav-current="service"].' + CLASS_CURRENT).length) {
                    slide = 0;
                    $dataScroll.animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="case"].' + CLASS_CURRENT).length) {
                    slide = item[0];
                    $dataScroll.animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="member"].' + CLASS_CURRENT).length) {
                    slide = item[0] + item[1];
                    $dataScroll.animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="interview"].' + CLASS_CURRENT).length) {
                    slide = item[0] + item[1] + item[2];
                    $dataScroll.animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="voc"].' + CLASS_CURRENT).length) {
                    slide = item[0] + item[1] + item[2] + item[3];
                    $dataScroll.animate({scrollLeft: slide}, speed, 'swing');
                } else if ($('[data-nav-current="contact"].' + CLASS_CURRENT).length) {
                    slide = item[0] + item[1] + item[2] + item[3] + item[4];
                    $dataScroll.animate({scrollLeft: slide}, speed, 'swing');
                } else if (documentHeight < 100) {
                    slide = 0;
                    $dataScroll.animate({scrollLeft: slide}, speed, 'swing');
                }
            }
        });
    }

    /*
     * スムーズスクロール
     */
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

    currentSetting();
    slideNavSetting();
    window.addEventListener('DOMContentLoaded', smoothScroll);
}