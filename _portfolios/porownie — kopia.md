---
layout: portfolio
title: "PROJEKT STANOWISKA GASTRONOMICZNEGO"
categories: wizualizacja
description: "Dolor sit amet consectetur elit sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat.duis aute irure sint occae cat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Sed perspiciatis unde omnis iste natus error sit voluptatem."
client: "Osoba prywatna"
area: " 50m<sup>2"
data: "luty 2020"
thumbnail: "/assets/img/portfolio/24/wiz_001.jpg"
galeria: "img/portfolio/24/galeria"
---
{% include portfolio-opis.html %}

{% include portfolio-galery.html %}



<div class="mainSection">
    <div id="one" class="bal-container">
        <div class="bal-before">
            <div class="bal-before-inset">
                <img src="/assets/img/portfolio/24/p/wiz_002.jpg">
                <div class="bal-beforePosition beforeLabel">
                    Wersja 1
                </div>
            </div>
        </div>
        <div class="bal-after">
            <img src="/assets/img/portfolio/24/p/wiz_001.jpg">
            <div class="bal-afterPosition afterLabel">
                Wersja 2
            </div>
        </div>
        <div class="bal-handle">
            <span class=" handle-left-arrow"></span>
            <span class="handle-right-arrow"></span>
        </div>
    </div>
</div>


<script src="/assets/plugins/comparison-slider/js/script.js"></script>

<script>
    new BeforeAfter({
        id: '#one'
    });
</script>
