$(document).ready(function(){

    var list = $(".list");
    var list_block;

    for (var key in song_list){
          list_block = $('<div class="list_block"></div>');
          list.append(list_block);

          list_block.append('<span class="play_btn"><img class="play_icon" src="images/play-jouer-37.png"><img class="pause_icon" src="images/pause-pause-37.png"></span>');
          list_block.append('<span class="song_title">'+ song_list[key].title + '</span>');
          list_block.append('<span class="song_artist">'+ song_list[key].artist + '</span>');
          list_block.append('<span class="song_genre">'+ song_list[key].genre + '</span>');
          list_block.append('<span class="song_duration">'+ song_list[key].duration + '</span>');
          list_block.append('<span class="beat_animation"><ul><li></li><li></li><li></li><li></li><li></li></ul></span>');
          list_block.append('<span class="track"><audio id="audio" controls><source src="songs/' + song_list[key].track + '" type="audio/mp3"></audio></span>');
          list_block.append('<span class="download_btn"><a target="_blank" href="songs/' + song_list[key].track +'"><img src="images/download-télécharger-37.png"</span>');
    }
      
    // Function play
    $(".list_block .play_btn .play_icon").on('click', function(current){

        $(this).parent().find(".play_icon").css("display", "none");
        $(this).parent().find(".pause_icon").css("display", "inline-block");
        $(".play_icon").not(this).parent().find(".pause_icon").css("display", "none");
        $(".play_icon").not(this).parent().find(".play_icon").css("display", "inline-block");

    // Add/Remove Class
        
        $(this).parent().parent().addClass("isPlaying");
        $(".play_icon").not(this).parent().parent().removeClass("isPlaying");

    // Beat animation 
        $(this).parent().parent().find(".beat_animation li").css("animation-play-state", "running").css("opacity", "1");
        $(".play_icon").not(this).parent().parent().find(".beat_animation li").css("animation-play-state", "paused").css("opacity", ".1");


    // Pause current track
        $("audio").each(function(e){
            if(e !== current.currentTarget){
                $(this)[0].pause();
            }
        });

    // Play current track
        $(this).parent().parent().find(".track audio")[0].play();
    });

    // Pause Function 

    $(".list_block .play_btn .pause_icon").on('click', function(){

        // Hide btn pause
        $(this).parent().find(".pause_icon").css("display", "none");
        // Show btn play 
        $(this).parent().find(".play_icon").css("display", "inline-block");

        // Beat Animation pause
        $(this).parent().parent().find(".beat_animation li").css("animation-play-state", "paused");

        // Pause current track 
        $(this).parent().parent().find(".track audio")[0].pause();
    })


    // Autoplay
    $(".autoplay_btn input").on('change', function(){
        if($(this).is(":checked")){
            $("audio").on('ended', function(){

                $(this).parent().parent().next().find("audio")[0].play();

                $(".list_block").removeClass("isPlaying");
                $(this).parent().parent().next().addClass("isPlaying");
                $(this).parent().parent().next().find(".beat_animation li").css("animation-play-state", "running").css("opacity", "1");


                $(this).parent().parent().next().find(".play_icon").css("display", "none");
                $(this).parent().parent().next().find(".pause_icon").css("display", "inline-block");


            });
        }else{

            $("audio").on('ended', function(){
                $(".beat_animation li").css("animation-play-state", "running").css("opacity", ".1");
                $(".pause_icon").css("display", "none");
                $(".play_icon").css("display", "inline-block");
            });

        }
    }).change();




});


$(function() {
    $('a[href*=#]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
});

$(document).ready(function(){


    // NAV SLIDE TOOGLE
    $('i.icon').click(function(){
        $('.nav-list').slideToggle()

    });

    // Sticky NAV BAR
    $(window).scroll(function(){
        var sc = $(this).scrollTop();
        if(sc > 50){
            $('header').addClass('sticky');
           
        }else{
            $('header').removeClass('sticky');
        
        }
    });
});

// // Quand je clique sur la flèche droite, on défile les images dans l'ordre croissant (1, 2, 3...)
// // On initialise le compteur à 0, numéro de la 1ère diapo
// let compteur = 0;

// // On s'assure que la page est chargée
// window.onload = function () {
//     // On va chercher toutes les classes diapo__element
//     const ELEMENTS = document.querySelectorAll(".diapo__element");

//     // On compte le nombre d'images (pour savoir où arrêter le compteur)
//     const NB_IMAGES = ELEMENTS.length;

//     // On va chercher l'élément "fleche-droite"
//     const DROITE = document.querySelector("#fleche-droite");

//     // On écoute l'évènement "click"
//     // DROITE.addEventListener("click", function(){
//     //     // On fait avancer d'une image
//     //     // On fait évoluer le compteur (0, 1, 2, 0, 1, 2...)
//     //     // AVANT de changer le compteur on enlève la classe diapo__element--active
//     //     // On se trouve sur l'image à masquer
//     //     // On retire la classe diapo__element--active de l'élément pointé par le compteur
//     //     ELEMENTS[compteur].classList.remove("diapo__element--active");

//     //     // On vérifie si on est à la dernière image
//     //     if(compteur === NB_IMAGES - 1){
//     //         compteur = 0;
//     //     }else{
//     //         compteur++;
//     //     }

//     //     // APRES avoir changé le compteur on ajoute la classe diapo__element--active
//     //     // On se trouve sur l'image à afficher
//     //     ELEMENTS[compteur].classList.add("diapo__element--active");
//     // });
//     DROITE.addEventListener("click", defile);

//     // On va chercher l'élément "fleche-gauche"
//     const GAUCHE = document.querySelector("#fleche-gauche");

//     // On écoute l'évènement "click"
//     GAUCHE.addEventListener("click", function () {
//         // On fait reculer d'une image
//         // On fait évoluer le compteur (0, 2, 1, 0, 2, 1...)
//         // AVANT de changer le compteur on enlève la classe diapo__element--active
//         // On se trouve sur l'image à masquer
//         ELEMENTS[compteur].classList.remove("diapo__element--active");

//         // On vérifie si on est à la première image
//         if (compteur === 0) {
//             // Si on est à la 1ère image, on va à la dernière
//             compteur = NB_IMAGES - 1;
//         } else {
//             // Sinon on décrémente le compteur
//             compteur--;
//         }

//         // APRES avoir changé le compteur on ajoute la classe diapo__element--active
//         // On se trouve sur l'image à afficher
//         ELEMENTS[compteur].classList.add("diapo__element--active");
//     });

//     // Exécuter quelquechose toutes les 5 secondes
//     // let timer = setInterval(function(){
//     //     // On fait avancer d'une image
//     //     // On fait évoluer le compteur (0, 1, 2, 0, 1, 2...)
//     //     // AVANT de changer le compteur on enlève la classe diapo__element--active
//     //     // On se trouve sur l'image à masquer
//     //     // On retire la classe diapo__element--active de l'élément pointé par le compteur
//     //     ELEMENTS[compteur].classList.remove("diapo__element--active");

//     //     // On vérifie si on est à la dernière image
//     //     if(compteur === NB_IMAGES - 1){
//     //         compteur = 0;
//     //     }else{
//     //         compteur++;
//     //     }

//     //     // APRES avoir changé le compteur on ajoute la classe diapo__element--active
//     //     // On se trouve sur l'image à afficher
//     //     ELEMENTS[compteur].classList.add("diapo__element--active");

//     // }, 5000);

//     // La variable est indispensable si on souhaite interrompre l'intervalle
//     let timer = setInterval(defile, 5000);

//     function defile() {
//         // On fait avancer d'une image
//         // On fait évoluer le compteur (0, 1, 2, 0, 1, 2...)
//         // AVANT de changer le compteur on enlève la classe diapo__element--active
//         // On se trouve sur l'image à masquer
//         // On retire la classe diapo__element--active de l'élément pointé par le compteur
//         ELEMENTS[compteur].classList.remove("diapo__element--active");

//         // On vérifie si on est à la dernière image
//         if (compteur === NB_IMAGES - 1) {
//             compteur = 0;
//         } else {
//             compteur++;
//         }

//         // APRES avoir changé le compteur on ajoute la classe diapo__element--active
//         // On se trouve sur l'image à afficher
//         ELEMENTS[compteur].classList.add("diapo__element--active");
//     }

//     // Gestion du survol
//     const DIAPO = document.querySelector(".diapo");

//     // On écoute l'évènement "mouseover"
//     DIAPO.addEventListener("mouseover", function () {
//         // On stoppe le défilement
//         clearInterval(timer);
//     });

//     // On écoute l'évènement "mouseout"
//     DIAPO.addEventListener("mouseout", function () {
//         // On redémarre le défilement
//         timer = setInterval(defile, 5000);
//     });

// } // Fin window.onload

// /*
// Mettre en place un défilement toutes les 5 secondes
// Arrêter le défilement si la souris se trouve sur le diaporama
// Reprendre quand la souris n'est plus dessus
// */