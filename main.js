import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

// https://hexschool.github.io/ajaxHomework/data.json


let data;
function init(){
  axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json")
  .then(function(response){
    data = response.data;
    console.log(data)
    renderC3();
    renderList();
  })
}
function renderC3(){
  // 篩選地區，並累加數字上去
  // totalObj 會變成 {高雄: 1, 台北: 1, 台中: 1}
  let totalObj = {};
  data.forEach(function(item,index){
    if(totalObj[item.area]==undefined){
      totalObj[item.area] = 1;
    }else{
       totalObj[item.area] +=1;
    }
  })
  // newData = [["高雄", 2], ["台北",1], ["台中", 1]]
  let newData = [];
  let area = Object.keys(totalObj);
  // area output ["高雄","台北","台中"]
  area.forEach(function(item,index){
    let ary = [];
    ary.push(item);
    ary.push(totalObj[item]);
    newData.push(ary);
  })
  
  // 將 newData 丟入 c3 產生器
  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type : 'donut',
      colors:{
        "高雄":"#E68618",
        "台中":"#5151D3",
        "台北":"#26BFC7"
      }
    },
    donut: {
      title: "套票地區比重"
    }
  });

}

function renderList(){
    const list = document.querySelector(".ticketCard-area");
    let str = '';
    data.forEach(function(item){
      str += `<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img src="${item.imgUrl}" alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`
    });
    list.innerHTML = str;
  }


init();

const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const btn = document.querySelector('.btn');


function addData() {
    // 將新增的資料宣告一個物件存入
    let obj = {
        id:data.length + 1,
        name:ticketName.value,
        imgUrl:ticketImgUrl.value,
        area:ticketRegion.value,
        description:ticketDescription.value,
        group:ticketNum.value,
        price:ticketPrice.value,
        rate:ticketRate.value
    };
  
    data.push(obj);  // 將新物件 push 回原 data 中
  };

  btn.addEventListener('click',function(e){
    addData();
    renderC3();
    renderList();
});



