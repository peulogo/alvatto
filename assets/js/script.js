    class CountProducts{
         constructor (countBasketProduct){
            this.parentCounProduct = countBasketProduct; // родитель с блоком переключения
            this.PlusCountBtnProduct = countBasketProduct.querySelector('.all-product-information-content-buy-price-quantity-plus'); // кнопка плюс
            this.MinusCountBtnProduct = countBasketProduct.querySelector('.all-product-information-content-buy-price-quantity-minus'); // кнопка минус
            this.InputCountBtnProduct = countBasketProduct.querySelector('.input-count'); // input count
            
            this.PlusCountBtnProduct.addEventListener('click', ()=>{
                this.InputCountBtnProduct.value++;
                
            });
            this.MinusCountBtnProduct.addEventListener('click', ()=>{
                
                 this.InputCountBtnProduct.value >1 ? this.InputCountBtnProduct.value-- : this.InputCountBtnProduct.value;
                
            })
        }
        
        
        
    }
    
    
    //rewiews stars
    class Rewiews {
        constructor() {
            this.starsContentOut = document.querySelectorAll('.coffee-machine-reviews-block-head-rating-stars');

            if (this.starsContentOut.length > 0) {
                this.starsContentOut.forEach(elem => {
                    const elemCountSrats = Number(elem.dataset.stars);
                    for (let i = 1; i <= 5; i++) {
                        const creatSpan = document.createElement('span');
                        const creatSpanClass = elemCountSrats < i ? 'stars-gray' : 'stars-yellow';
                        creatSpan.classList.add(creatSpanClass);
                        elem.append(creatSpan);
                    }
                })
            }
        }
    }
    
    
    
    
    
    
    document.addEventListener('DOMContentLoaded', function() {
           // маски форм
    $.mask.definitions['h'] = "[12345679]";
    $(".form-phone").mask("+7 (h99) 999-99-99");
    
    
        
        
        
        
        $('#btn-open').click(function() {
            $('#modal-block').toggleClass('open');
        });
        $('#btn-close').click(function() {
            $('#modal-block').removeClass('open');
        });
        //faq open and close
        const faqItems = document.querySelectorAll('.faq-list-row-out');
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                const answer = this.querySelector('.faq-list-row-answer');
                const question = this.querySelector('.faq-list-row-question');
                $(answer).slideToggle(300);
                $(question).toggleClass('faq-list-row-open');
            });
        });
        //card switcher
        const productRow = document.querySelectorAll('.cards-out')
        productRow.forEach(item => {
            const switchButtons = item.querySelectorAll('.cards-block-switch-button');
            const blocks = item.querySelectorAll('.cards-block');
            const switchButtonsArray = Array.from(switchButtons);
            const blocksArray = Array.from(blocks);
            switchButtonsArray[0].classList.add('active');
            blocksArray.forEach((block, index) => {
                if (index !== 0) {
                    block.style.display = 'none';
                }
            });
            switchButtonsArray.forEach((button, index) => {
                button.addEventListener('click', function() {
                    switchButtonsArray.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    blocksArray.forEach(block => {
                        block.style.display = 'none';
                    });
                    blocksArray[index].style.display = 'flex';
                });
            });
        });
        
        
        //   переключеие количества товара с карточке продукта
        const countBasketProduct = document.querySelector('.all-product-information-content-buy-price-quantity');
         countBasketProduct != null ? new CountProducts(countBasketProduct) : '';
           
        
        // отзывы
        new Rewiews();
        
        
        // открыть все характеристики в карточке товара
        const allHaracterBtn = document.getElementById('all-haracteristic-btn');
        if(allHaracterBtn !== null){
            
            allHaracterBtn.addEventListener('click', function(){
                const allHaracterAllBoxes = document.querySelectorAll('#all-haracteristic-box-out .characteristics-specific-product-block-table-item');
                allHaracterAllBoxes.forEach(elem=>{
                    $(elem).slideDown(800);
                    elem.classList.remove('characteristics-specific-product-block-table-hidden');
                    
                })
                allHaracterBtn.style.display = "none";
            })
            
            
        }
        
        
        
        // header fixed
        const headerTop = document.querySelector('.header-fixed');
        
         window.addEventListener('scroll', function() {
       	        if(window.pageYOffset >= 100) {
                   headerTop.classList.add('header-fixed-active');
                  //pdtop.style.marginTop = '107' + 'px';
    	            }
    	        if(window.pageYOffset < 5) {
                   headerTop.classList.remove('header-fixed-active');
                     //pdtop.style.marginTop = 'auto';
      	            }
    	});
        
        
        //swiper bestseller
        const swiperSliderBestseller = new Swiper('.bestseller-content-slider', {
            pagination: {
                el: '.bestseller-pagination'
            },
            navigation: {
                prevEl: '.bestseller-prev-button',
                nextEl: '.bestseller-next-button',
            },
            loop: true,
            slidesPerView: 2,
            spaceBetween: 30,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                576: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                }
            }
        });
        //swiper reviews
        const swiperSliderReviews = new Swiper('.reviews-content-slider', {
            pagination: {
                el: '.reviews-pagination',
            },
            navigation: {
                prevEl: '.reviews-prev-button',
                nextEl: '.reviews-next-button',
            },
            loop: true,
            slidesPerView: 1,
        });
        //swiper all-product-thumb
        const swiperAllProductThumbs = new Swiper('.all-product-content-slider-thumb', {
            loop: true,
            slidesPerView: 4,
            spaceBetween: 10,
            freeMode: true,
            watchSlidesProgress: true,
        });

        //swiper all-product    
        const swiperAllProduct = new Swiper('.all-product-content-slider', {
            pagination: {
                el: '.all-product-pagination',
            },
            navigation: {
                prevEl: '.all-product-prev-button',
                nextEl: '.all-product-next-button'
            },
            loop: true,
            slidesPerView: 1,
            thumbs: {
                swiper: swiperAllProductThumbs,
            },
        });
    }, false);