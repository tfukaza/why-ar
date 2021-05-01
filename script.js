var anchors = document.getElementsByClassName('chapter');
var market = document.getElementsByClassName('text-inset');

var offset = [0, 100, 200, 300,400,500,600];
var Yindex = [];
var now = 0;
var phoneTimeline;
var hereAnim;

function onResize() {

    var w = window.innerWidth || document.documentElement.clientWidth;
    phoneTimeline = anime.timeline({
        loop: true
    });
    var o = anime.setDashoffset(document.getElementById('outline'));
    var t = anime.setDashoffset(document.getElementById('text'));
    document.getElementById('outline').setAttribute('stroke-dashoffset', o);
    document.getElementById('text').setAttribute('stroke-dashoffset', t);
    phoneTimeline.add({
            targets: '#what-phone',
            translateX: [{
                value: 0
            }, {
                value: (w * 0.4)
            }, {
                value: (w * 0.4 + 150)
            }, {
                value: 0
            }],
            rotateZ: [{
                value: 0
            }, {
                value: 0
            }, {
                value: 90
            }, {
                value: 0
            }],
            duration: 12000,
            offset: 0,
            elasticity: 100
        })
        .add({
            targets: '#what-paper #outline',
            strokeDashoffset: [o, o, o, o, o, 0, 0, o, o, o, o, o, o, o, o, o],
            duration: 12000,
            offset: 0,
            easing: 'easeInOutCubic'
        }).add({
            targets: '#what-paper #text',
            strokeDashoffset: [t, t, t, t, t, t, t, t, t, 0, 0, t, t, t, t, t],
            duration: 12000,
            offset: 0,
            easing: 'easeInOutCubic'
        }).add({
            targets: '#what-paper text',
            opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            duration: 12000,
            offset: 0,
            elasticity: 0
        });;



}

function onLoad() {
    for (i = 0; i < anchors.length; i++) {
        Yindex.push(anchors[i].getBoundingClientRect().top + window.pageYOffset);
    }

    hereAnim = anime({
        targets: ['#index-here'],
        rotateZ: [0, 360],
        backgroundColor: ['#ffde00', '#ff613e'],
        duration: 5000,
        elasticity: 100,
        loop: false
    });





    //phone animation
    onResize();
    chooseHere(0);
    var tapeMove = anime({
        targets: '.vhspart',
        translateX: function(vhspart, i, l) {
            return ((3 - i) * 60);
        },
        translateY: function(vhspart, i, l) {
            return -((3 - i) * 37);
        },
        duration: 3000,
        elasticity: 300,
        direction: 'alternate',
        loop: true
    });
    var recMove = anime({
        targets: ['#mask', '#rec_phone'],
        translateX: [-420, 500, -500, 0],
        translateY: [100, -300, -200, 0],
        duration: 12000,
        elasticity: 300,
        loop: true
    });

    var l = document.getElementsByClassName('warnpath');


    for (var i = 0; i < l.length; i++) {
        l[i].setAttribute('stroke-dashoffset', anime.setDashoffset(l[i]));

        anime({
            targets: l[i],
            strokeDashoffset: [anime.setDashoffset(l[i]), 0],
            duration: 2000,
            delay: anime.random(0, 5000),
            eeasing: 'easeInOutCubic',
            direction: 'alternate',
            loop: true,
            autoplay: true
        });

    }

}

function moveIndex(num) {

    var tempMove = anime({
        targets: '#index-here',
        top: offset[num],
        duration: 500,
        elasticity: 300
    });

}

function moveHere(num) {
    hereAnim.restart();
    window.smoothScroll(anchors[num], 200);

}

function chooseHere(num) {
    var m = document.getElementById('market-pane');
    if (num == 0) {
        m.className = "section chapter zero";

    }
    if (num == 1) {
        m.className = "section chapter one";
    }
    if (num == 2) {
        m.className = "section chapter two";
    }
    anime({
        targets: '#m-main',
        translateX: function() {
            return -(num * 256);
        },
        duration: 500,
        elasticity: 300
    });
    for (var i = 0; i < market.length; i++) {
        if (i == num) {
            anime({
                targets: market[i],
                opacity: 1,
                duration: 500,
                elasticity: 300
            });

        } else {
            anime({
                targets: market[i],
                opacity: 0,
                duration: 500,
                elasticity: 300
            });
        }
    }


}
window.onscroll = function() {

    for (i = 0; i < anchors.length - 1; i++) {
        if (window.pageYOffset < Yindex[i + 1] && window.pageYOffset >= Yindex[i]) {

            if (i != now) {
                moveIndex(i);
            }
            now = i;
            break;
        }
    }
}
