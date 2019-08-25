//functions
(function () {

    // sidebar 随动
    var sidebaraffix = function () {
        if ($('#sidebar').height() && 61) {
            if ($('#main').height() > $('#sidebar').height()) {
                var footerHeight = 0;
                if ($('#page-footer').length > 0) {
                    footerHeight = $('#page-footer').outerHeight(true);
                }
                $('#sidebar').affix({
                    offset: {
                        top: $('#sidebar').offset().top - 61,
                        bottom: $('#footer').outerHeight(true) + footerHeight + 6
                    }
                });
            }
        }
    }

    // 搜索框
    var toSearch = function () {
        $('.search-box').on('click', function (e) {
            $('#searchform').animate({ width: '200px' }, 200),
                $('#searchform input').css('display', 'block');
            $(document).one('click', function () {
                $('#searchform').animate({ width: '0' }, 100),
                    $('#searchform input').hide();
            });
            e.stopPropagation();
        });
        $('#searchform').on('click', function (e) { e.stopPropagation(); })
    }

    // 回顶部
    var gotop = function () {
        $('.gotop-box').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500);
            return false;
        });
        $(window).scroll(function () {
            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.gotop-box').addClass('active');
            } else {
                $('.gotop-box').removeClass('active');
            }
        });
    }

    // 文章页 图片点击放大
    var showPhotos = function () {
        layer.photos({
            photos: '.kratos-post-content p,.kratos-status-post p',
            anim: 0
        });
    }

    // 顶部导航 下拉菜单
    var offcanvas = function () {
        var $clone = $('#kratos-menu-wrap').clone();
        $clone.attr({
            'id': 'offcanvas-menu'
        });
        $clone.find('> ul').attr({
            'class': 'ul-me',
            'id': ''
        });
        $('#kratos-page').prepend($clone);
        $('.js-kratos-nav-toggle').on('click', function () {
            if ($('.nav-toggle').hasClass('toon')) {
                $('.nav-toggle').removeClass('toon');
                $('#offcanvas-menu').css('right', '-240px');
            } else {
                $('.nav-toggle').addClass('toon');
                $('#offcanvas-menu').css('right', '0px');
            }
        });
        $('#offcanvas-menu a').on('click', function () {
            $('.nav-toggle').removeClass('toon');
            $('#offcanvas-menu').css('right', '-240px');
        });
        $('#offcanvas-menu').css('height', $(window).height());
        $('#offcanvas-menu').css('right', '-240px');
        $(window).resize(function () {
            var w = $(window);
            $('#offcanvas-menu').css('height', w.height());
            if (w.width() > 769) {
                if ($('.nav-toggle').hasClass('toon')) {
                    $('.nav-toggle').removeClass('toon');
                    $('#offcanvas-menu').css('right', '-240px');
                }
            }
        });
    }

    // 顶部导航 下拉菜单
    var menu = function () {
        $(document).click(function (e) {
            var container = $('#offcanvas-menu,.js-kratos-nav-toggle');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('.nav-toggle').hasClass('toon')) {
                    $('.nav-toggle').removeClass('toon');
                    $('#offcanvas-menu').css('right', '-240px');
                }
            }
        });
        $('#kratos-header-section:not(.color-banner) ul>li').hover(function () {
            $(this).children('ul').slideDown(150)
        }, function () { $(this).children('ul').stop(true, false).slideUp(200) });
    }

    // 文章页 打赏
    var donateConfig = function () {
        $(document).on('click', '.Donate', function () {
            layer.open({
                type: 1,
                area: ['300px', '370px'],
                title: '打赏作者',
                resize: false,
                scrollbar: false,
                content: '<div class="donate-box"><div class="meta-pay text-center"><strong>扫一扫支付</strong></div><div class="qr-pay text-center"><img class="pay-img" id="alipay_qr" src="/images/reward/zfb.png"><img class="pay-img d-none" id="wechat_qr" src="/images/reward/wx.png"></div><div class="choose-pay text-center mt-2"><input id="alipay" type="radio" name="pay-method" checked><label for="alipay" class="pay-button"><img src="/images/reward/alipay.png"></label><input id="wechatpay" type="radio" name="pay-method"><label for="wechatpay" class="pay-button"><img src="/images/reward/wechat.png"></label></div></div>'
            });
            $('.choose-pay input[type="radio"]').click(function () {
                var id = $(this).attr('id');
                if (id == 'alipay') { $('.qr-pay #alipay_qr').removeClass('d-none'); $('.qr-pay #wechat_qr').addClass('d-none') };
                if (id == 'wechatpay') { $('.qr-pay #alipay_qr').addClass('d-none'); $('.qr-pay #wechat_qr').removeClass('d-none') };
            });
        });
    }

    // 短代码 -> 展开/收缩
    var xControl = function(){
        $(document).on('click','.xHeading',function(event){
            var $this = $(this);
            $this.closest('.xControl').find('.xContent').slideToggle(300);
            if ($this.closest('.xControl').hasClass('active')){
                $this.closest('.xControl').removeClass('active');
            }else{
                $this.closest('.xControl').addClass('active');
            }
            event.preventDefault();
        });
    }

    // pjax reload
    $.fn.pjaxReload = function () {
        sidebaraffix();
        showPhotos();
        if(typeof _ar != "undefined") {
            _ar.pjaxReload();
        }
    }

    $(function () {
        gotop();
        sidebaraffix();
        offcanvas();
        menu();
        toSearch();
        showPhotos();
        donateConfig();
        xControl();
    });

}());

//highlight
hljs.initHighlightingOnLoad();
