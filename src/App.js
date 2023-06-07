import React, { useEffect, useState } from "react"
import { getRandomColor, getQuotes } from "./colorAndQuotes"

async function getRandomQuote () {
  const quotesData = await getQuotes()
  const randomQuote = quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes?.length)
  ]
  return randomQuote
}

export default function App () {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [tweetHref, setTweetHref] = useState("")
  const [tumblrHref, setTumblrHref] = useState("")
  const [color, setColor] = useState("")
  const [quoteNbr, setQuoteNbr] = useState(0)

  useEffect(() => {
    const newColor = getRandomColor()
    setColor(newColor)
    getRandomQuote().then(randomQuote => {
      setQuote(randomQuote.quote)
      setAuthor(randomQuote.author)
    })
      .catch(error => {
        console.log(error)
      })
  }, [quoteNbr])

  useEffect(() => {
    document.body.style.backgroundColor = color
    const quoteBox = document.getElementById("quote-box")
    quoteBox.style.color = color
    setTweetHref("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent("'" + quote + "' " + author))
    setTumblrHref("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + encodeURIComponent(author) + "&content=" + encodeURIComponent(quote) + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button")
  }, [quote])

  const triggerNewQuote = () => {
    setQuoteNbr(quoteNbr + 1)
  }

  return (
    <div id="quote-box" className="wrapper">
      <div id="quote-text" className="quote-text">
        <i id="openQuote" className="fa fa-quote-left quote-left"></i>
        <span id="text">{quote}</span>
      </div>
      <div className="quote-author">
        - <span id="author">{author}</span>
      </div>
      <div id="buttons" className="buttons">
        <a
          className="linkButton"
          id="tweet-quote"
          href={tweetHref}
          target="_top"
          style={{ backgroundColor: color }}
        >
          <i className="fa fa-twitter"></i>
        </a>
        <a
          className="linkButton"
          id="tumblr-quote"
          href={tumblrHref}
          style={{ backgroundColor: color }}
        >
          <i className="fa fa-tumblr margin-right"></i>
        </a>
        <button
          className="linkButton"
          id="new-quote"
          href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22When%20I%20let%20go%20of%20what%20I%20am%2C%20I%20become%20what%20I%20might%20be.%22%20Lao%20Tzu"
          style={{ backgroundColor: color }}
          onClick={triggerNewQuote}
        >
          <i className="fa">new quote</i>
        </button>
      </div>
    </div>
  )
}
