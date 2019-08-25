
var ___as = '屁屁..',
    _ar = _ar || {}
    ;


_ar = {

    init: function () {

        _ar.layout.init();

        //hljs.initHighlightingOnLoad();  // highlightjs

        _ar.analytics.init();

        this.console_output();
        
    },

    pjaxReload: function () {
        var _url = window.location.pathname;
        if(typeof _hmt.push != 'undefined' && typeof _hmt.push != 'undefined') {
            _hmt.push(['_trackPageview', _url]);
            _czc.push([ '_trackPageview', _url, _url_referer]);
        }

        // 重定义来路URL
        _url_referer = window.location.pathname;
    },

    console_output: function () {
        var css_font = 'font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;';

        console.log('%c 来啊，互相伤害啊~',
            css_font + 'font-size:20px;color:#777;text-shadow: 1px 1px #bbb, -1px -1px #444;'
        );

        var d1 = new Date('2028-02-18').getTime() - new Date().getTime(),
            d2 = Math.floor(d1 / (24 * 3600 * 1000));
        console.log('%c             距离域名到期剩余 ' + d2 + ' 天  ←_←',
            css_font + 'font-size:15px;color:#777;'
        );
    }

};

//==========================================================
//      # 统计 #

var _hmt = _hmt || [],                          //  百度统计
    _czc = _czc || [],                          //  CNZZ
    _url_referer = window.location.pathname     // 来路URL
    ;

_ar.analytics = {

    init: function () {

        this.baidu();
        this.cnzz();

    },

    //  统计 通用脚本加载
    loadScript: function (name, url) {
        $.ajax({
            url: url,
            type: 'GET',
            timeout: 1000 * 5,
            dataType: 'script',
            cache: true,
            async: true,
            error: function (xhr, status, error) {
                console.log('>_ [' + name + '] 加载失败');
            }
        });
    },

    //  百度统计
    baidu: function () {
        this.loadScript('百度统计', 'https://hm.baidu.com/hm.js?451905ef8df7b993c1fbc577f51a3b69');
    },

    //  CNZZ
    cnzz: function () {
        this.loadScript('CNZZ', 'https://s13.cnzz.com/z_stat.php?id=1273121910&web_id=1273121910&async=1');
    }

};

//==========================================================
//      #is#

_ar.is = {

    //  首页
    index: function () {
        if (location.pathname == '/') {
            return true;
        }
    },

    //  文章列表(包括首页)
    postlist: function () {
        var _pathname = location.pathname;
        if (_pathname == '/' || _pathname.slice(0, 6) == '/page/') {
            return true;
        }
    },

    //  文章 页
    post: function () {
        if (location.pathname.slice(0, 6) == '/post/') {
            return true;
        }
    },

    //  分类 页
    categories: function () {
        var _pathname = location.pathname;
        if (_pathname == '/' || _pathname.slice(0, 6) == '/page/') {
            return true;
        }
    },

    //  归档 页
    archives: function () {
        if (location.pathname.slice(0, 10) == '/archives/') {
            return true;
        }
    },

    //  标签 页
    tags: function () {
        if (location.pathname.slice(0, 6) == '/tags/') {
            return true;
        }
    },


};


//==========================================================
//      # 布局 #

_ar.layout = {

    init: function () {

        _ar.layout.post.init();
        _ar.layout.global.init();

    },

};

_ar.layout.global = {

    init: function () {

        this.header();
        this.main();
        this.footer();

    },

    header: function () {

        var _tmp = '';

        // search
        $('#searchform').on('submit', function (e) {
            var keyword = $('#search[name="wd"]').val(),
                url = 'https://www.google.com/search?q=site:arae.cc/post/%20' + keyword
                ;
            
            if (keyword == '') {
                layer.msg('啥都没有搜个屁');
                return false;
            } else if (navigator.userAgent.indexOf('iPad') > -1 || navigator.userAgent.indexOf('iPod') > -1 || navigator.userAgent.indexOf('iPhone') > -1) {
                location.href = url;
            } else {
                window.open(url, "_blank");
            }
            return false;
        });

        // search end





    },

    main: function () {

    },

    footer: function () {

    }

};

_ar.layout.post = {

    init: function () {

        this.post();

    },

    post: function () {
        if (_ar.is.post() != true) {
            return;
        }

        // // 易语言代码渲染
        // if ($('pre[class="ecode"]').length > 0) {

        //     $('head').append('<link href="/lib/ecode/ecode.css?v=3.5.9" rel="stylesheet" type="text/css" />')
        //     $.getScript('/lib/ecode/ecode.js?v=3.5.9', function () {
        //         Ecode.create().trans();//创建并绘制

        //     });
        // }

    },

};


//==========================================================

$(function () {
    if ("ar_main_load_lock" in window) return;
    ar_main_load_lock = true;

    _ar.init();

});

function isArray(_var) {
    return Object.prototype.toString.call(_var) == '[object Array]';
}
