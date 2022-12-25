/**
 * sitenav.link
 */
const text = '{"google":{"name":"Google","title":"Google","url":"https://www.google.com/","search":"https://www.google.com/search?q={0}"},"github":{"name":"GitHub","title":"GitHub","url":"https://github.com","search":"https://github.com/search?q={0}"},"baidu":{"name":"百度","title":"百度搜索","url":"http://www.baidu.com","search":"http://www.baidu.com/s?wd={0}"},"etherscan":{"name":"Etherscan","title":"Etherscan","url":"https://etherscan.io/","search":"https://etherscan.io/search?q={0}"},"oklink":{"name":"OKLink","title":"OKLink","url":"https://oklink.com/","search":"https://www.oklink.com/middle/multi-search?key={0}"},"btccom":{"name":"BTC.com","title":"BTC.com","url":"https://www.btc.com/","search":"https://explorer.btc.com/search/{0}"},"blockchair":{"name":"Blockchair","title":"Blockchair","url":"https://blockchair.com/","search":"https://blockchair.com/search?q={0}"},"blockbeats":{"name":"BlockBeats","title":"BlockBeats","url":"https://www.theblockbeats.info/","search":"https://www.theblockbeats.info/search/{0}"},"ahhhhfs":{"name":"ahhhhfs","title":"ahhhhfs","url":"https://www.ahhhhfs.com","search":"https://www.ahhhhfs.com/?s={0}"},"pansearch":{"name":"PanSearch","title":"PanSearch","url":"https://pansearch.long2ice.io","search":"https://pansearch.long2ice.io/search?keyword={0}&pan="},"tbsdy":{"name":"土拨鼠电影","title":"土拨鼠电影","url":"https://www.tbsdy.com","search":"https://www.tbsdy.com/search.html?keyword={0}"},"binance-trade":{"name":"Binance Trade, EX: ETH_BTC","title":"Binance Trade","url":"https://www.binance.com/trade.html","search":"https://www.binance.com/zh-CN/trade/{0}?theme=dark&type=spot"},"tokenview":{"name":"Tokenview","title":"Tokenview","url":"https://tokenview.com/","search":"https://tokenview.com/search?q={0}"},"tronscan":{"name":"Tronscan","title":"Tronscan","url":"https://tronscan.org/","search":"https://tronscan.org/search?q={0}"},"bscscan":{"name":"BSCScan","title":"BSCScan","url":"https://bscscan.com/","search":"https://bscscan.com/search?q={0}"},"ploygonscan":{"name":"Ploygonscan","title":"Ploygonscan","url":"https://ploygonscan.com/","search":"https://ploygonscan.com/search?q={0}"},"solana":{"name":"Solana","title":"Solana","url":"https://solana.com/","search":"https://solana.com/search?q={0}"},"xrpscan":{"name":"XRPSCAN","title":"XRPSCAN","url":"https://xrpscan.com/","search":"https://xrpscan.com/search?q={0}"},"arbiscan":{"name":"Arbiscan","title":"Arbiscan","url":"https://arbiscan.com/","search":"https://arbiscan.com/search?q={0}"},"beaconscan":{"name":"Beaconscan","title":"Beaconscan","url":"https://beaconscan.com/","search":"https://beaconscan.com/search?q={0}"},"coinmarketcap":{"name":"CoinMarketCap","title":"CoinMarketCap","url":"https://coinmarketcap.com/","search":"https://coinmarketcap.com/search?q={0}"},"oklink-sol":{"name":"OKLinkSOL","title":"OKLink SOL","url":"https://oklink.com/","search":"https://www.oklink.com/sol/search?key={0}"},"oklink-okc-test":{"name":"OKLinkOKCTest","title":"OKLink OKC Test","url":"https://oklink.com/","search":"https://www.oklink.com/okc-test/search?key={0}"},"OptimisticScan":{"name":"OptimisticScan","title":"OptimisticScan","url":"https://optimistic.etherscan.io/","search":"https://optimistic.etherscan.io//search?q={0}"},"etherchain":{"name":"Etherchain","title":"Etherchain","url":"https://www.etherchain.org/","search":"https://www.etherchain.org/search?q={0}"},"waxbloksio":{"name":"Waxbloksio","title":"Waxbloksio","url":"https://wax.bloks.io/","search":"https://wax.bloks.io/"},"bloksio":{"name":"EOS Bloks.io","title":"EOS Bloks.io","url":"https://bloks.io/","search":"https://bloks.io/"},"eosflare.io":{"name":"EOSFlare.io","title":"EOSFlare.io","url":"https://eosflare.io/","search":"https://eosflare.io/search/{0}"}}';
const searchSources = JSON.parse(text);
var selectElement = document.getElementById('select-explorers');
for (const searchSource in searchSources) {
    // Option(text, value)
    selectElement.add(new Option(searchSources[searchSource].name, searchSource));
}
$('select').selectpicker();
// format the string
const format = (str2Format, ...args) => str2Format.replace(/(\{\d+\})/g, a => args[+(a.substr(1, a.length - 2)) || 0] );

function clickSearch() {
    address = $("#content").val();
    address = address.trim();
    type = $("#select-explorers").val();
    if (address.length === 0) {
        toastr.warning('请填写内容.');
        return;
    }
    if (!(type in searchSources)) {
        toastr.warning('配置错误.');
        return;
    }
    let url = format(searchSources[type].search, address);
    console.log(url);   
    var $btn = $(this);
    $btn.button('loading');
    // new window open
    var win = window.open(url);
    $btn.button('reset');
}

$(function() {
    $('#content').on('keypress',function(e) {
        if(e.key == 'Enter') { clickSearch(); }
    });
    // onclick
    $("#search").on("click", clickSearch);
});