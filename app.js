// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
let mynum = 100;
let url = "http://numbersapi.com/";

async function favNum(){

  let data = await $.getJSON(`${url}${mynum}?json`);
  console.log(data);
}

favNum();
  


// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
let mynums = [1, 100, 158];

async function favNums(){

  let data = await $.getJSON(`${url}${mynums}?json`);
  console.log(data);

}
favNum();


// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function facts(){

  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${url}${mynum}?json`))
  );
  facts.forEach(data => {$("body").append(`<p>${data.text}</p>`);});
};



facts();