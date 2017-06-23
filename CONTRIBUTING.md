# Contributing

I recommend proposing changes via pull requests so your name will be stored in the contributors page, also creating a GitHub account is quite easy. Finally, please use a spell checker before submitting it.

When submitting a new anime commit first the original file, then the fix in other commit, so it's possible to check changes. In the first commit use the the MyAnimeList ID and episode number as the title, and in the description put the the anime and translation details. Check [this example commit](https://github.com/qgustavor/fixed-subtitles/commit/3ea112e5232da0f8dbbc664d6fc2b20bd539ca0a). For other commits put "Fixed [Anime ID][Episodes]: [Anime Title]" in title, then describe what was changed, using the same language from the translation.

Note that the objective of this repository is fixing subtitles, *not* making a list of bad translators. In fact this will end being a list of the *good* ones as they know that they're humans which make mistakes and so they make their scripts easier to fix. The others either are too lazy to fix their mistakes or don't admit their mistakes...

If you want to fix an error from *the others* you can do a whiteout translation. For stylistic reasons try to make it remember a correction fluid: put a white rectangle over the wrong subtitle then the fixed subtitle above it. Finally put the fix in the ["whiteout fixes" folder](https://github.com/qgustavor/fixed-subtitles/tree/master/whiteout%20fixes). Use the following image as inspiration:

![Whiteout inspiration](https://i.imgur.com/1MosfLO.jpg?1)

## Folder organization:

* Create folders if some anime was three or more files;
* Group files by seasons, including OVAs, specials, movies and other related files in the same folder (like what AniDB and some fansubs does);
* Use the romanized name (like MyAnimeList) as the folder name, prefixed by the MyAnimeList ID prefix, separated by hyphen;
* If the name is too long (more than 25 characters), you can use some abbreviation based on the romanized name ([this anime](https://myanimelist.net/anime/14749/Ore_no_Kanojo_to_Osananajimi_ga_Shuraba_Sugiru) can be shortened to Oreshura);
* If the anime hasn't an abbreviation use the long name, if will not cause any problem;
* Use the original subtitle or video name in files;
* Use the original romanized name (to avoid Unicode issues) in folders and commits; even if some people have problems with those names don't use English (or Portuguese) name translations because then you're making it harder to people which don't speak those languages;

## Non-anime content:

* For other content you can adapt the rules above for the media you're submitting;
* If you're not using a MyAnimeList ID include the website abbreviation like this: ["IMDB-0120338 - Titanic"](http://www.imdb.com/title/tt0120338/), ["MDL-19702 - NIGEHAJI"](http://mydramalist.com/19702-nigeru-wa-haji-da-ga-yaku-ni-tatsu).
* In case the abbreviations are too confusing open an issue pointing this.

# Como contribuir

Recomendo que enviem mudanças via *pull requests* por que assim seu nome aparecerá na página de contribuidores, além disso criar uma conta no GitHub é bem fácil. Finalmente, por favor use um corretor ortográfico antes de enviar.

Ao enviar um novo anime primeiro faça um *commit* do arquivo original, então outro com a correção, de modo que seja possível verificar as mudanças. No primeiro *commit* use o ID do MyAnimeList e o número do episódio como título, e coloque informações do anime e da tradução na descrição. Olhe [esse *commit* de exemplo](https://github.com/qgustavor/fixed-subtitles/commit/3ea112e5232da0f8dbbc664d6fc2b20bd539ca0a). Para os outros commits coloque "Fixed [ID do Anime][Episódios]: [Nome do Anime]" no título e depois descreva o que foi alterado na língua que foi usada na tradução.

Note que o objetivo desse repositório é arrumar legendas, *não* fazer uma lista dos tradutores ruins. Na verdade ele se tornará uma lista de quem é *bom* nisso já que seus eles sabem que são humanos que cometem erros e assim deixam seus scripts mais fáceis de serem corrigidos. Já os outros ou são muito preguiçosos para corrigir seus erros ou não admitem seus erros...

Caso queira corrigir um erro *desses outros* você pode fazer uma correção tipo corretivo. Por questão estilística pedimos que faça a correção de modo que pareça mesmo um corretivo: coloque um retângulo branco sobre a legenda errada e por cima coloque a correção. Finalmente coloque a correção [na pasta "whiteout fixes"](https://github.com/qgustavor/fixed-subtitles/tree/master/whiteout%20fixes). Use a imagem acima (na versão em inglês desse documento) para inspiração.

## Organização das pastas:

* Crie pastas se algum anime tem três ou mais arquivos;
* Agrupe os arquivos por temporada, incluindo OVAs, especiais, filmes e outros arquivos relacionados na mesma pasta (como o AniDB e algumas fansubs fazem);
* Use o nome romanizado (como o MyAnimeList) como o nome da pasta, prefixado com o ID do MyAnimeList, separado por hífen.
* Se o nome for muito longo (mais de 25 caracteres) pode ser usado a abreviação baseada no nome romanizado ([esse anime](https://myanimelist.net/anime/14749/Ore_no_Kanojo_to_Osananajimi_ga_Shuraba_Sugiru) pode ser encurtado para Oreshura);
* Se o anime não tem uma abreviação use o nome longo, isso não causará nenhum problema;
* Use o nome original da legenda ou do vídeo nos arquivos;
* Use o nome original romanizado (para evitar problemas com Unicode) nas pastas e *commits*; mesmo que algumas pessoas tenham problemas com esses nomes não use traduções para Português (ou Inglês) pois assim você estará causando problemas para quem não fala essas línguas;

## Conteúdos que não sejam anime:

* Para outros conteúdos você pode adaptar as regras acima para o tipo de conteúdo que você está enviando;
* Se você não for usar uma ID do MyAnimeList inclua a abreviação do site usado dessa forma: ["IMDB-0120338 - Titanic"](http://www.imdb.com/title/tt0120338/), ["MDL-19702 - NIGEHAJI"](http://mydramalist.com/19702-nigeru-wa-haji-da-ga-yaku-ni-tatsu).
* Caso as abreviações causem confusão abra uma issue para que possamos organizar isso.
