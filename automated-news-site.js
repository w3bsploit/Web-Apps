
$(function(){

    $('.search-container .fas').on("click", function(){
        var search_term = $('.search').val();
        if(search_term == ""){
            alert("Please enter a search term!");
        }else{
            window.document.location = 'search-results.html' + '?search_query=' + search_term;
        }
        
    });

    //cpa offer on click
    $('.cpa-offer').on("click", function(){
        window.document.location = "https://afflat3e1.com/lnk.asp?o=5358&c=918277&a=409970&k=0698760976DA8C2E849BD3F78C6E2C3A&l=4125";
    });

    $('.cpa-offer2').on("click", function(){
        window.document.location = "https://afflat3e1.com/lnk.asp?o=5358&c=918277&a=409970&k=0698760976DA8C2E849BD3F78C6E2C3A&l=4125";
    });


    var trendingNews;
    var articles;
    const keywords_left = [];
    const keywords_right = [];
    var init = () => {
        trendingNews = $.ajax({
            url: 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=1BAoOxYZbKwJhzTlP4Wi3OPO70vzqE0G',
            method: 'GET',
        });

        trendingNews.done((data)=>{
            trendingNews = data;
            const classlist_left = ['.trending-keywords .left a:eq(0)', '.trending-keywords .left a:eq(1)', 
            '.trending-keywords .left a:eq(2)', '.trending-keywords .left a:eq(3)',
            '.trending-keywords .left a:eq(4)'];

            const classlist_right = ['.trending-keywords .right a:eq(0)', '.trending-keywords .right a:eq(1)',
            '.trending-keywords .right a:eq(2)', '.trending-keywords .right a:eq(3)',
            '.trending-keywords .right a:eq(4)'];

            //assign left function
            const assignLeft = () =>{
                //loop up until the count reaches 5
                for(let i=0; i<5; i++){
                    if(i == 1 || i == 4){
                        $(classlist_left[i]).text(data.results[i].des_facet[1]);
                        keywords_left.push(data.results[i].des_facet[1]);
                    }else{
                        $(classlist_left[i]).text(data.results[i].des_facet[0]);
                        keywords_left.push(data.results[i].des_facet[0]);
                    }
                   
                }
                
            }

            //assign right function
            
            const assignRight = () =>{
                let data_index = 15;
                //loop up until the count of classlist_right reaches 6 
                for(let i=0; i<6; i++){
                    $(classlist_right[i]).text(data.results[data_index].des_facet[0]);
                    
                    
                    data_index++;
                    //end loop when data_index reaches 15
                    if(data_index == 20){ break; }
                }
            }
            

            //(export) functions for if any trending keywords are clicked , search term in search engine pg
            const leftTrending_clicked = () => {
                let i=0;
                let get_keyword = "";
                while(i<classlist_left.length){
                    $(classlist_left[i]).on("click", function(){
                        get_keyword = $(this).text();
                        //redirect user to search_engine.html pg , export get_keyword var
                        window.document.location = 'search-results.html' + '?search_query=' + get_keyword;
                    });
                    i++;
                }
                return get_keyword;
            }

            //(export) functions for if any trending keywords are clicked , search term in search engine pg
            const rightTrending_clicked = () => {
                let get_keyword = "";
                for(let i=0; i<classlist_right.length; i++){
                    $(classlist_right[i]).on("click", function(){
                        get_keyword = $(this).text();
                        //redirect user to search_engine.html pg , export get_keyword var
                        window.document.location = 'search-results.html' + '?search_query=' + get_keyword;
                    });
                }
                return get_keyword;
            }


            //call functions here
            assignLeft();
            assignRight();
            leftTrending_clicked();
            rightTrending_clicked();


        });
    }


    var popularArticles = () => {
        articles = $.ajax({
            url: 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=1BAoOxYZbKwJhzTlP4Wi3OPO70vzqE0G',
            method: 'GET',
        });

        articles.done((data)=>{
            articles = data;

            //api calls to update #1 live news
            $('.test-class div:eq(0) h5').text(data.results[10].title);
            $('.test-class div:eq(0) .left img').attr("src", data.results[10].multimedia[1].url);

            
            // (export) function to article-requests.js & redirect to articles.html
            const firstArticle_clicked = (get_keyword="") =>{
                $('.test-class div:eq(0) h5').on("click", function(){
                    get_keyword = $(this).text();
                    window.document.location = 'article.html' + '?article_title=' + get_keyword;
                });
            }

            firstArticle_clicked();

            $('#featured-article').text(data.results[25].title);
            $('#left-col .img-container').css("background", "url("+data.results[25].multimedia[0].url+")");

            $('#left-col .img-container').on("click", function(){
                window.open(data.results[0].url);
            });

            const h5_list = [
                '.test-class .1 h5',
                '.test-class .2 h5',
                '.test-class .3 h5',
                '.test-class .4 h5',
                '.test-class .5 h5',
                '.test-class .6 h5',
                '.test-class .7 h5',
                '.test-class .8 h5',
                '.test-class .9 h5'
            ];

            const imgs_list = [
                '.test-class .1 .left img',
                '.test-class .2 .left img',
                '.test-class .3 .left img',
                '.test-class .4 .left img',
                '.test-class .5 .left img',
                '.test-class .6 .left img',
                '.test-class .7 .left img',
                '.test-class .8 .left img',
                '.test-class .9 .left img'
            ];

            const update_feed = () => {
                var get_keyword = " ";
                var img_link = " ";
                var article_url = " ";
                var content = " ";
                var count = 0;
                data.results.forEach(res =>{
                    $(h5_list[count]).text(res.title);
                    $(imgs_list[count]).attr("src", res.multimedia[0].url);
                    $(h5_list[count]).on("click", function(){
                        img_link = res.multimedia[0].url;
                        article_url = res.url;
                        content = res.abstract;
                        localStorage.setItem('img_url', img_link);
                        localStorage.setItem('article_link', article_url);
                        localStorage.setItem('viewer_content', content);
                        get_keyword = $(this).text();
                        window.document.location = 'article.html' + '?article_title=' + get_keyword;
                        console.log(img_link);
                    });
                    count++;
                });
            }

            update_feed();


            const p_list = [
                '.most-popular .first p',
                '.most-popular .second p',
                '.most-popular .third p',
                '.most-popular .fourth p'
            ];

            const css_list = [
                '.most-popular .first',
                '.most-popular .second',
                '.most-popular .third',
                '.most-popular .fourth'
            ];

            //most popular update function
            const updateMost_popularText = () => {
                let data_index = 11;
                for(let i=0; i<p_list.length; i++){
                    $(p_list[i]).text(data.results[data_index].title);
                    
                    data_index++;
                }
            }

            updateMost_popularText();


            const updateMost_popularImg = () =>{
                let image_index = 11;
                for(let j=0; j<css_list.length; j++){
                    $(css_list[j]).css("background", "url("+data.results[image_index].multimedia[0].url+")");
                    image_index++;
                }
            }
            updateMost_popularImg();


            // (export) function to article-requests.js & redirect to articles.html
            
            const popular_clicked = () =>{
                let article_index = 11;
                for(let i=0; i<p_list.length; i++){
                    
                    $(p_list[i]).on("click", function(){
                        if(i == 0){
                            article_index = 11;
                            window.open(data.results[article_index].url);
                        }else if(i == 1){
                            article_index = 12;
                            window.open(data.results[article_index].url);
                        }else if(i == 2){
                            article_index = 13;
                            window.open(data.results[article_index].url);
                        }else if(i == 3){
                            article_index = 14;
                            window.open(data.results[article_index].url);
                        }
                    });
                }
                
                
            } 

            popular_clicked();

        

            //slider api calls to chnge img & text

            const carouselImg_list = [
                '#carousel-img1',
                '#carousel-img2',
                '#carousel-img3',
                '#carousel-img4'
            ];

            const carouselH5_list = [
                '#carousel-id1 h5',
                '#carousel-id2 h5',
                '#carousel-id3 h5',
                '#carousel-id4 h5'
            ];


            const updateCarousel = (j=15) => {
                for(let i=0; i<carouselH5_list.length; i++){
                    $(carouselH5_list[i]).text(data.results[j].title);
                    $(carouselImg_list[i]).attr("src", data.results[j].multimedia[0].url);
                    j++;
                }
            }

            updateCarousel();


            // (export) function to article-requests.js & redirect to articles.html
            const carousel_clicked = (j=15) => {
                let keyword=" "
                $('#class-1').on("click", function(){
                    keyword = $(carouselH5_list[0]).text();
                    window.open(data.results[j].url);
                    
                });

                $('#class-2').on("click", function(){
                    keyword = $(carouselH5_list[1]).text();
                    j=16;
                    window.open(data.results[j].url);
                    
                });

                $('#class-3').on("click", function(){
                    keyword = $(carouselH5_list[2]).text();
                    j=17;
                    window.open(data.results[j].url);
                });

                $('#class-4').on("click", function(){
                    keyword = $(carouselH5_list[3]).text();
                    j=18;
                    window.open(data.results[j].url);
                });
                
            }

            carousel_clicked();
        });
    }
    init();
    popularArticles();
});

