import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/Newscards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey = '92e23f94ab6f97a378b23de7df9aa1922e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadLines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);


                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again.');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');

                    }
                    
                    window.open(articles[number].url, '_blank');

                }
            }

        })
    }, []);


    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/50/e7/c2/50e7c228-abd3-a901-9f40-d5d6d3126a05/source/512x512bb.jpg" className={classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>

    );
}

export default App;