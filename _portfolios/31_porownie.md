---
layout: portfolio
title: "Łazienka"
categories: wizualizacja wnętrza
description: "Dolor sit amet consectetur elit sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat.duis aute irure sint occae cat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Sed perspiciatis unde omnis iste natus error sit voluptatem."
client: "Osoba prywatna"
area: " 50m<sup>2"
data: "luty 2020"
thumbnail: "/assets/img/portfolio/31/wiz_003.jpg"
galeria: "img/portfolio/31/galeria"
---
{% include portfolio-opis.html %}

{% include portfolio-galery.html %}



<div class="">
    <div id="one" class="bal-container uk-margin-medium-bottom ratio_2_3">
        <div class="bal-after">
            <img src="/assets/img/portfolio/31/porownanie/wiz_006.jpg">
            <div class="bal-afterPosition afterLabel">
                After
            </div>
        </div>
        <div class="bal-before">
            <div class="bal-before-inset">
                <img src="/assets/img/portfolio/31/porownanie/wiz_007.jpg">
                <div class="bal-beforePosition beforeLabel">
                    Before
                </div>
            </div>
        </div>
        <div class="bal-handle">
            <span class=" handle-left-arrow"></span>
            <span class="handle-right-arrow"></span>
        </div>
    </div>
    <div id="two" class="bal-container uk-margin-medium-bottom ratio_2_3">
        <div class="bal-after">
            <img src="/assets/img/portfolio/31/porownanie/wiz_008.jpg">
            <div class="bal-afterPosition afterLabel">
                After
            </div>
        </div>
        <div class="bal-before">
            <div class="bal-before-inset">
                <img src="/assets/img/portfolio/31/porownanie/wiz_009.jpg">
                <div class="bal-beforePosition beforeLabel">
                    Before
                </div>
            </div>
        </div>
        <div class="bal-handle">
            <span class="handle-left-arrow"></span>
            <span class="handle-right-arrow"></span>
        </div>
    </div>
    <div id="three" class="bal-container uk-margin-medium-bottom ratio_2_3">
        <div class="bal-after">
            <img src="/assets/img/portfolio/31/porownanie/wiz_010.jpg">
            <div class="bal-afterPosition afterLabel">
                After
            </div>
        </div>
        <div class="bal-before">
            <div class="bal-before-inset">
                <img src="/assets/img/portfolio/31/porownanie/wiz_011.jpg">
                <div class="bal-beforePosition beforeLabel">
                    Before
                </div>
            </div>
        </div>
        <div class="bal-handle">
            <span class="handle-left-arrow"></span>
            <span class="handle-right-arrow"></span>
        </div>
    </div>
</div>


<script src="/assets/plugins/comparison-slider/js/script.js"></script>

<script>
    new BeforeAfter({
        id: '#one'
    });
    new BeforeAfter({
        id: '#two'
    });
    new BeforeAfter({
        id: '#three'
    });
</script>
