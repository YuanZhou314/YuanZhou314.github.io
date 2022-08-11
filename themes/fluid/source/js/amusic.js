const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
	autoplay: false, //自动播放
    lrcType: 0,
    audio: [
	{
        name: '特别的人',
        artist: '方大同',
        url: 'http://music.163.com/song/media/outer/url?id=28403111.mp3',
        cover: 'https://p1.music.126.net/RTB72JJJapo01l4XfVDAWQ==/109951166349819975.jpg',
	lrc: 'https://zhouyinglin.cn/lrcs/特别的人.lrc',
    },
	{
        name: '身骑白马',
        artist: '徐佳莹',
        url: 'http://music.163.com/song/media/outer/url?id=5233038.mp3',
        cover: 'http://p2.music.126.net/jSLMqcE_Yq27rRKDNrRKcA==/109951163187407183.jpg',
	lrc: 'https://zhouyinglin.cn/lrcs/身骑白马.lrc',
    },
	{
        name: 'California',
        artist: 'Akia',
        url: 'http://music.163.com/song/media/outer/url?id=2119491.mp3',
        cover: 'http://p1.music.126.net/Brbh0sAkJHZ00sM0ajUYCw==/937883418548729.jpg',
	lrc: 'https://zhouyinglin.cn/lrcs/California.lrc',
    },
	{
        name: 'Blue(Cover 脸红的思春期)',
        artist: '朵蜜天女JOY',
        url: 'http://music.163.com/song/media/outer/url?id=549866356.mp3',
        cover: 'http://p2.music.126.net/H3i8I9Wd08ilTbYAglo08A==/109951162828107504.jpg',
	lrc: 'https://zhouyinglin.cn/lrcs/Blue-LHDSCQ.lrc',
    },
	{
        name: '琥珀色の街、上海蟹の朝',
        artist: '茶泡饭/春茶',
        url: 'http://music.163.com/song/media/outer/url?id=1805402980.mp3',
        cover: 'http://p1.music.126.net/cZafdoj9RYu_EN1ZXovAjg==/109951165550223646.jpg',
    },
	{
	name: '不得不爱',
        artist: '潘玮柏/弦子',
        url: 'http://music.163.com/song/media/outer/url?id=139764.mp3',
        cover: 'http://p2.music.126.net/INvCpYVCXacWAKuW83wPkQ==/109951165547357444.jpg',
	lrc: 'https://zhouyinglin.cn/lrcs/不得不爱.lrc',
    },
	]
});

