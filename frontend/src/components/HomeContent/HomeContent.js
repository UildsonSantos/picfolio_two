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


    const imagensFloresUrl = [
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Orquidea.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Lirio-da-paz-1-1.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Lavanda.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Azaleia.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Crisantemo.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/10/gerbera-1024x683.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2019/12/Girassol-1024x673.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/lindo-jardim-de-flores-Bellis-perennis-brancas-margaridas-1024x585.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/Arranjo-de-flores-astromelias-amarelas-para-condolencias-ikebana-flores-1024x585.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/lindo-jardim-de-flores-iris-amarela-1024x585.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/lindo-jardim-de-flor-Petunia-1024x585.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/flor-Hibiscus-vermelha-1024x585.jpg",
        "https://www.ikebanaflores.com.br/blog/wp-content/uploads/2024/09/jardim-de-flores-hortensias-1024x585.jpg"
    ];

    const imagensMundoUrl = [
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/648e/live/203a4cc0-bee3-11ef-9880-bd78436cd924.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/088f/live/327855b0-bee5-11ef-a0f2-fd81ae5962f4.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/3e42/live/c7811b10-bee5-11ef-a2ca-e99d0c9a24e3.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/363e/live/7d453da0-bee6-11ef-a2ca-e99d0c9a24e3.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/7382/live/2785d5e0-bee7-11ef-aff0-072ce821b6ab.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/3c95/live/da238b20-bee7-11ef-a0f2-fd81ae5962f4.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/4f96/live/ec51f920-bee8-11ef-aff0-072ce821b6ab.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/0d04/live/e3be5410-beee-11ef-aff0-072ce821b6ab.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/ead5/live/297ab620-bee9-11ef-a2ca-e99d0c9a24e3.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/c9aa/live/d57dfb10-beeb-11ef-a2ca-e99d0c9a24e3.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/2104/live/2e3979e0-beed-11ef-a0f2-fd81ae5962f4.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/1d20/live/f9cda5c0-beef-11ef-a0f2-fd81ae5962f4.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/db01/live/0d6d4c70-bef0-11ef-a0f2-fd81ae5962f4.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/036e/live/c326a1f0-bee2-11ef-aff0-072ce821b6ab.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/9ede/live/d10fc0f0-beea-11ef-a2ca-e99d0c9a24e3.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/ef44/live/ed0ada20-beee-11ef-aff0-072ce821b6ab.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/3b7d/live/b5bcea20-bef0-11ef-aff0-072ce821b6ab.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/9a98/live/e21944b0-bef0-11ef-a0f2-fd81ae5962f4.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/94bc/live/7107c970-bef7-11ef-aff0-072ce821b6ab.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/5914/live/94e27df0-de86-11ef-bd1b-d536627785f2.jpg.webp"
    ];

    const imagensSportsUrl = [
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/4551/live/32b01600-6c7c-11ef-9078-253b6929b0dd.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/7532/live/cbc20c90-6c45-11ef-8c32-f3c2bc7494c6.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/ae42/live/14045200-6c47-11ef-b43e-6916dcba5cbf.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/a1b4/live/08595f00-6c46-11ef-8c32-f3c2bc7494c6.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/47ed/live/c949eb30-6c46-11ef-8c32-f3c2bc7494c6.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/c1c7/live/94cd3910-6c47-11ef-b970-9f202720b57a.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/7ff0/live/750ed780-6c5d-11ef-b970-9f202720b57a.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/9fab/live/8195fbb0-6c48-11ef-8c32-f3c2bc7494c6.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/4a07/live/b08bc5d0-6c48-11ef-b43e-6916dcba5cbf.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/a021/live/c3e0d550-6c50-11ef-b43e-6916dcba5cbf.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/5679/live/5a40a9c0-6c52-11ef-8c32-f3c2bc7494c6.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/b1e1/live/0734f050-6c53-11ef-b43e-6916dcba5cbf.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/f0ee/live/af1b1dd0-6c53-11ef-b43e-6916dcba5cbf.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/f114/live/08511940-6c54-11ef-8c32-f3c2bc7494c6.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/96b7/live/b45cb810-6c55-11ef-b970-9f202720b57a.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/c403/live/38d40120-6c56-11ef-8c32-f3c2bc7494c6.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/eef3/live/8cf17c10-6c7e-11ef-9078-253b6929b0dd.jpg.webp",
        "https://imagens.ebc.com.br/mz9rpFItP47pyFik_jy3vm7gvJA=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/51373724236_072cc9a887_o.jpg?itok=YZoySE0Z",
        "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/2473/live/e74b4160-6c5a-11ef-b970-9f202720b57a.jpg.webp",
        "https://ichef.bbci.co.uk/ace/ws/787/cpsprodpb/978f/live/69402550-6c5b-11ef-b970-9f202720b57a.jpg.webp",
    ];

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
                    {imagensFloresUrl.map((imagemUrl, index) => (
                        <SwiperSlide key={index}>
                            <img src={imagemUrl} alt="imagem" />
                        </SwiperSlide>
                    ))}
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
                    {imagensMundoUrl.map((imagemUrl, index) => (
                        <SwiperSlide key={index}>
                            <img src={imagemUrl} alt="imagem" />
                        </SwiperSlide>
                    ))}
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
                    {imagensSportsUrl.map((imagemUrl, index) => (
                        <SwiperSlide key={index}>
                            <img src={imagemUrl} alt="imagem" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default HomeContent;
