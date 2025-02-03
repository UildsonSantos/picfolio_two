import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectCube, Pagination } from 'swiper/modules';

const HomeContent = () => {

    return (
        <div className='home-container'>
            <div className='slide'>
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    pagination={true}
                    modules={[EffectCube, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Orquidea.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Lirio-da-paz-1-1.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Lavanda.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Azaleia.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Crisantemo.jpg" alt='imagem' />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/10/gerbera-1024x683.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Girassol-1024x673.jpg" alt='imagem' />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='slide'>
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    pagination={true}
                    modules={[EffectCube, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/lindo-jardim-de-flores-Bellis-perennis-brancas-margaridas-1024x585.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/Arranjo-de-flores-astromelias-amarelas-para-condolencias-ikebana-flores-1024x585.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/lindo-jardim-de-flores-iris-amarela-1024x585.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/lindo-jardim-de-flor-Petunia-1024x585.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/flor-Hibiscus-vermelha-1024x585.jpg" alt='imagem' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/jardim-de-flores-hortensias-1024x585.jpg" alt='imagem' />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default HomeContent;
