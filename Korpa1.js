const PROIZVODI = {
    "3850104230011": {
        "product_name": "Zip Hoodie",
        "product_type": "dukserice",
        "product_price": 169.99,
        "product_image": "./images/Duks1.png",
        "product_image2": "./images/Duks1a.png"
    },
    "8600012704051": {
        "product_name": "Quarter-Zip Sweatshirt",
        "product_type": "dukserice",
        "product_price": 75.99,
        "product_image": "./images/Duks2.png",
        "product_image2": "./images/Duks2a.png"
    },
    "8001841663692": {
        "product_name": "Hoodie",
        "product_type": "dukserice",
        "product_price": 59.99,
        "product_image": "./images/Duks3.png",
        "product_image2": "./images/Duks3a.png"
    },
    "8600043028270": {
        "product_name": "Windbreaker Jacket",
        "product_type": "jakne",
        "product_price": 75.99,
        "product_image": "./images/Jakna1.png",
        "product_image2": "./images/Jakna1a.png"
    },
    "4067700013019": {
        "product_name": "Hardshell Jacket",
        "product_type": "jakne",
        "product_price": 59.99,
        "product_image": "./images/Jakna2.png",
        "product_image2": "./images/Jakna2a.png"
    },
    "3838471047043": {
        "product_name": "Woven Letterman Jacket",
        "product_type": "jakne",
        "product_price": 95.99,
        "product_image": "./images/Jakna3.png",
        "product_image2": "./images/Jakna3a.png"

    },
    "8600103027779": {
        "product_name": "T-Shirt",
        "product_type": "majce",
        "product_price": 29.99,
        "product_image": "./images/Majca1.png",
        "product_image2": "./images/Majca1a.png"
    },
    "8600103024571": {
        "product_name": "Polo Shirt",
        "product_type": "majce",
        "product_price": 39.99,
        "product_image": "./images/Majca2.png",
        "product_image2": "./images/Majca2a.png"
    },
    "8600103024534": {
        "product_name": "Pantalone xyz",
        "product_type": "pantalone",
        "product_price": 30.99,
        "product_image": "https://placehold.it/200x300",
        "product_image2": "./images/Majca2a.png"
    }            
}

const KORPA = {}  // ovde vodimo evidenciju o stanju i kolicinama u korpi

function napraviListuKorpe (barkod, product_image, product_name, product_price){
     // isto ... prvo osmislimo dizajn
    const karticaProizvodaUkorpi = document.createElement("div")
    karticaProizvodaUkorpi.classList.add("proizvodiukorpi")
    karticaProizvodaUkorpi.innerHTML = `
    <div>
        <img src="${product_image}" alt="${product_name}" />
    </div>
    <div>
        <h3>${product_name}</h3>
    </div>
    <div>
        <p>${product_price} $</p>
    </div>
    <div class="brojac">
        <div><button class="brojac dodaj" data-bk="${barkod}">+</button></div>
        <div data-kolicine="${barkod}">${KORPA[barkod].kolicina}</div>
        <div><button class="brojac oduzmi" data-bk="${barkod}">-</button></div>
    </div>
    <div>
        <p data-ukupno="${barkod}">${product_price} $</p>
    </div>
    `
    // ovde je ubacena opcija da se ukloni/obrise proizvod iz korpe
    const obrisi = document.createElement("button")
    obrisi.classList.add("dugme_obrisi")
    obrisi.innerText = "✕"
    karticaProizvodaUkorpi.append(obrisi)
    obrisi.addEventListener("click", (e) => {
        const indikator = document.querySelector("#stanjeKorpe")
        const biloUK = KORPA[barkod].kolicina
        const prebrojao = indikator.getAttribute("data-broj")
        const ukupno = prebrojao-biloUK
        indikator.setAttribute("data-broj", ukupno) // menjamo informaciju o kolicini u atributu indikatora
        indikator.innerText = ukupno
        if ( ukupno === 0) {indikator.style.color = "black"}  // ako smo pobrisali sve iz korpe, indikator menja boju u crno/default
        e.target.parentNode.remove()
        KORPA[barkod].kolicina = 0
        for ( let pozicija in KORPA) {
            if ( pozicija === barkod) {
                KORPA[barkod] = undefined    // ** ovako mi radi, ako ovo ne stavim, nece mi ponovo dodavati ovaj proizvod. ! Linija 165 imamo uslov
            }
        }

    })

    return karticaProizvodaUkorpi
}

function KarticaProizvoda (barkod,product_image,product_image2,product_name,product_price,product_type) {
    // osmislicemo kako izgleda ta kartica, odnosno sadrzaj prikaza
    const okvirKartice = document.createElement("div")
    okvirKartice.classList.add("okvirKartice")
    okvirKartice.setAttribute("name", product_type)                                                           
    const templejtPrikaza = `
        <div id="divImg">
        <section id="${barkod}" class="splide" aria-label="Beautiful Images">
        <div class="splide__track">
                <ul class="splide__list">
                    <li class="splide__slide">
                        <img src="${product_image}" alt="${product_name}">
                    </li>
                    <li class="splide__slide">
                        <img src="${product_image2}" alt="${product_name}">
                    </li>
                </ul>
        </div>
        </section>
        </div>
        <h3>${product_name}</h3>
        <p>${product_price} $</p>
    ` // ovo ispisujemo u sadrzaj okvirKartice
    okvirKartice.innerHTML = templejtPrikaza
    // kreiramo dugme za dodavanje proizvoda u korpu
    const dugmeDodajUKorpu = document.createElement("button")
    dugmeDodajUKorpu.classList.add("dugmeDodajUKorpu")
    dugmeDodajUKorpu.setAttribute("data-barkod", barkod)
    dugmeDodajUKorpu.innerText = " Dodaj u korpu "
    // dugme ubacujemo u okvir kartice
    okvirKartice.append(dugmeDodajUKorpu)
    // kreiramo dogadjaj za klik na dugme unosa u korpu
    dugmeDodajUKorpu.addEventListener("click", (e) =>   {
             // povezujemo se sa 'indikatorom'- ikonica/stanje,  koji ce pratiti stanje korpe
        const indikator = document.querySelector("#stanjeKorpe")
        let ima = indikator.getAttribute("data-broj") // ovaj atribut ce se dinamicki menjati, u njega cemo upisivati trenutna stanja
        if (ima <= 0) {
            indikator.style.display = "block"
            indikator.style.color = "red"
        }
            // proveravamo sadrzaj liste KORPA, kreiramo(if undefined) novo-dodate proizvode, a sadrzaj korpe upisujemo (append) novo-dodati proizvod
            // ovako radimo za sada. Ovaj korak nam sluzi da pratimo stanje korpe i menjamo kolicine
        const sadrzajKorpe = document.querySelector(".inner")
        const barkod = e.target.getAttribute("data-barkod")
        const pruk = PROIZVODI[barkod]

        if (KORPA[barkod] === undefined){
            KORPA[barkod] = {
                "product_name": PROIZVODI[barkod].product_name,
                "product_price": PROIZVODI[barkod].product_price,
                "product_image": PROIZVODI[barkod].product_name,
                "kolicina": 1
            } 
        
            // gre, pa jos malo goree..iznad f-je KarticaProizvoda, cemo napraviti funfciju za kreiranje liste korpe ==> napraviListuKorpe
            const karticaProizvodaUkorpi = napraviListuKorpe (barkod,pruk.product_image,pruk.product_name,pruk.product_price)
            sadrzajKorpe.append(karticaProizvodaUkorpi)
       
        } else {
            // ako postoji u korpi i KORPI korigujemo kolicine i ukupnu cenu za unetu kolicinu. Za sada samo dodajem, nema smanjivanja :), resicemo i to kasnije.
            KORPA[barkod].kolicina +=1
            const zbirKolicine = document.querySelector(`[data-kolicine="${barkod}"]`)
            zbirKolicine.innerText = KORPA[barkod].kolicina 
            const ukupnaCena = KORPA[barkod].kolicina *Number(pruk.product_price)
            const zbirCene = document.querySelector(`[data-ukupno="${barkod}"]`)
            zbirCene.innerText = ukupnaCena.toFixed(2) + " $"

        }

        // provera stanja/2 i promena ispisa u indikatoru
        ima = indikator.getAttribute("data-broj")
        let n = 0
        for(let k in KORPA){
            if(KORPA[k] === undefined){
                let broj = 0
                continue
            } else { broj = KORPA[k].kolicina }

            broj = KORPA[k].kolicina
            n += broj
        }

        indikator.innerText=n 
        const sada = indikator.setAttribute("data-broj", n)
     
    })
    return okvirKartice
}


// on/off prikaz zadrzaja korpe
const prikaziKorpu = document.querySelector("#ikonica") // indikator - pored ikonice korpe / #ikonica sadrzi i ikonicu <img> i brojac <div> ili <span>, sve jedno
const korpa = document.querySelector("#PrikazKorpe")
// "klik"-om na ovaj prostor menjamo 'status' prikaza, upisan u atribut . podrazumevano da je prikaz korpe u startu sakriven
prikaziKorpu.addEventListener("click", () => {
    const prikazKorpe = korpa.getAttribute("data-status") 
    const podrazumevano = "off"
    if (prikazKorpe === podrazumevano) {
        korpa.setAttribute("data-status", "on" )   
    } else {
        korpa.setAttribute("data-status", podrazumevano )         
    } 
})


const ListaProizvoda = document.querySelector("#PrikazProizvoda")

const RAZNI = [] // ovde vodimo evidenciju o tipovima proizvoda

window.addEventListener("DOMContentLoaded", () => {
    for (let barkod in PROIZVODI) {
        const ProizvodN = PROIZVODI[barkod]
        // idemo gore da napravimo fungciju za ovo.. > KarticaProizvoda
        // u koju cemo poslati ostale podatke vezane za ProizvodN kao argument
        const KarticaNtogProizvoda = KarticaProizvoda(barkod,ProizvodN.product_image,ProizvodN.product_image2,
                                                             ProizvodN.product_name,ProizvodN.product_price,
                                                             ProizvodN.product_type)
        // ------                                                    
        // ispitujemo niz sa tipovima proizvoda, i sta je u njemu do sada. 
        // Ako postoji novi tip dodajemo ga u spisak, i kreiramo novi <div> za ovaj novi tip proizvoda - append                                                     
        if (RAZNI.indexOf(ProizvodN.product_type) === -1){
            RAZNI.push(ProizvodN.product_type)
            const pr = ProizvodN.product_type
            const Tpr = document.createElement("div")
            Tpr.setAttribute("id",pr) // svakome dodeljujemo informaciju o tipu, i nih ce se smestati kartice proizvoda
            ListaProizvoda.append(Tpr)   
        } 
        
        const staJeTo = KarticaNtogProizvoda.getAttribute('name')
        // staJeTo.append(KarticaNtogProizvoda)  ovako nece da radi,  kaze: staJeTo.append is not a function ! ??
        // ---
        // morao sam ovako,'rucno'! Za sada, dok ne vidim sta je u pitanju...
        if (staJeTo === "jakne"){

            jakne.append(KarticaNtogProizvoda)
        } else if (staJeTo === "dukserice"){

            dukserice.append(KarticaNtogProizvoda)
        } else if (staJeTo === "majce") {

            majce.append(KarticaNtogProizvoda)
        } else if (staJeTo === "pantalone") {

            pantalone.append(KarticaNtogProizvoda)
        }   
       
    }

    // prikazuje tipove proizvoda sa checkbox-om, kako bi smo "filtrilali" prikaz odredjenog tipa
    // prvo prodjemo kroz niz i sortiramo checkbox po tipu, ispisujemo/prikazujemo svaki - append.
    for (let tipO of RAZNI) {
        const izborPrikaza = document.querySelector("#izborPrikaza") // hardkodovano u HTML
        const tipDugmeta = document.createElement("input")
        tipDugmeta.setAttribute("type","checkbox")
        tipDugmeta.setAttribute("checked", "on") // svima postavljam da budu prikazani
        tipDugmeta.setAttribute("data-tipP",tipO) // svakome dodeljujemo informaciju o tipu
        const ispis = document.createElement("span")
        ispis.innerText = " prikazi " + tipO
        const razmak = document.createElement("br")
        izborPrikaza.append(tipDugmeta,ispis,razmak)
    }

    // provera koji je tip cekiran , prikaz/sakrivanje
    const IzabraniZaPrikaz = document.querySelectorAll("[data-tipP]")
        for (let izabrano of IzabraniZaPrikaz ) {
            izabrano.addEventListener("click", (e) => {
            const stanje = e.target
            if (stanje.checked){
                const tipJe = e.target.getAttribute("data-tipP")
                const dohvati = document.getElementById(tipJe)
                dohvati.style.display = "grid"
        
            } else { 
                const tipJe = e.target.getAttribute("data-tipP")
                const dohvati = document.getElementById(tipJe)
                dohvati.style.display = "none"       
            }

        })       
    }
    //  :) :) :)   ovo je vrh !   25 linija koda i !!! parent, element, sibiling od... nod... od sta god :))))
    document.addEventListener("click", (e) => {
        const indikator = document.querySelector("#stanjeKorpe")
        let ima = Number(indikator.getAttribute("data-broj"))
        const barkod = e.target.getAttribute("data-bk")
        if (e.target.classList.contains("dodaj")) {
            KORPA[barkod].kolicina +=1
            ima += 1
            const novo = indikator.setAttribute("data-broj", ima)
            indikator.innerText = ima
            const zbirKolicine = document.querySelector(`[data-kolicine="${barkod}"]`)
            zbirKolicine.innerText = KORPA[barkod].kolicina
            const oduzmi = e.target.parentElement.nextElementSibling.nextElementSibling.firstChild.getAttribute("disabled")
            //console.log(oduzmi)
            if (oduzmi === "on"){
                e.target.parentElement.nextElementSibling.nextElementSibling.firstChild.removeAttribute("disabled")
            }

            const ukupnaCena = KORPA[barkod].kolicina *Number(PROIZVODI[barkod].product_price)  // ovo je nedostajalo da radi suma cena
            const zbirCene = document.querySelector(`[data-ukupno="${barkod}"]`)
            zbirCene.innerText = ukupnaCena.toFixed(2) + " $"
            
        } else if(e.target.classList.contains("oduzmi")){
            KORPA[barkod].kolicina -=1
            ima -= 1
            const novo = indikator.setAttribute("data-broj", ima)
            indikator.innerText = ima
            const zbirKolicine = document.querySelector(`[data-kolicine="${barkod}"]`)
            zbirKolicine.innerText = KORPA[barkod].kolicina 
            if(KORPA[barkod].kolicina === 1){
                e.target.setAttribute("disabled", "on")
            }

            const ukupnaCena = KORPA[barkod].kolicina *Number(PROIZVODI[barkod].product_price)  // ovo je nedostajalo da radi suma cena
            const zbirCene = document.querySelector(`[data-ukupno="${barkod}"]`)
            zbirCene.innerText = ukupnaCena.toFixed(2) + " $"
        }

       
        
    })     
 
})
