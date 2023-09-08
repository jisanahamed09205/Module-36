const handleCategory = async () =>{
    // console.log('clicked');
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    
    // get id
    const categoryContainer = document.getElementById('category-container')
    // console.log(data.data);

    const categoriesName = data.data;
    // ?'./images/Icon.png':''

    categoriesName.forEach((categories) =>{
        // console.log(categories);
        const div = document.createElement('div');
        div.innerHTML =`
        <a onclick="handleInfo(${categories.category_id})" class=" tab bg-red-500 text-white">${categories.category}</a>
        `;
        categoryContainer.appendChild(div);
    });
    // console.log(data.data);

    
};
 let num ;
const handleInfo =async(id) =>{
    // console.log(id.length);
    num = id;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    // console.log(res);
    const data = await res.json();
    // console.log(data.data);

    const cardData = data.data;
    // sort
    // cardData.forEach(())
    asual(cardData);
    // console.log(data.data.others);
   
};

const asual = (cardData) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML='';



    const emptyContainer = document.getElementById('empty-category');
    // console.log(data.data);
    if(cardData.length === 0 ){
        emptyContainer.classList.remove('hidden')
    }else{
        emptyContainer.classList.add('hidden')
    }


    cardData.forEach((info)=>{
        const hour = Math.floor(info.others.posted_date/3600);
        const min = Math.floor((info.others.posted_date% 3600) / 60);

        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card bg-orange-100 shadow-xl">
            <figure class="relative">
            <img class="h-52"  src="${info.thumbnail}" alt="Shoes" />
            <div class="absolute w-36 bottom-5 right-5 rounded py-0.5 px-3 text-xs text-white ${info.others.posted_date?'bg-black':'bg-transparent'}"
                <p class="">${info.others.posted_date?hour + 'hrs'+ min + 'min ago' : ''}</p>
            </div>
            </figure>
            <div class="card-body">
                <div class="flex ">
                    <div class="mr-4 avatar">
                        <div class="w-10 h-10 rounded-full">
                        <img class=""
                            src="${info.authors[0].profile_picture}"
                        /></div>
                    </div>
                <div>
                    <h2 class="card-title font-semibold text-base">${info.title}</h2>
                    <div class="flex">
                        <small class="mr-4">${info.authors[0].profile_name}</small>
                        <img src="${info.authors[0].verified?'./images/verified.png':''}" alt="">
                    </div>
                    <small>${info.others.views} views</small>
                </div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
}
// const somoy =(time) =>{
//     const convertSec = parseInt(time);
//     const hour = Math.floor(convertSec/3600);
//     const min = Math.floor((convertSec% 3600) / 60);




// }

const sortHandler = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${num}`)
    // console.log(res);
    const data = await res.json();
    // console.log(data.data);

    const cardData = data.data;
    const sort = cardData.sort((a,b)=>{
        let sortSliceFirst = a.others.views.slice(0, -1)
        let sortSliceSecond =  b.others?.views.slice(0, -1)
        console.log(sortSliceFirst,sortSliceSecond)
        return  sortSliceSecond - sortSliceFirst
    })
    // sort
    // cardData.forEach(())
    asual(sort);
}
handleCategory();
handleInfo("1000")