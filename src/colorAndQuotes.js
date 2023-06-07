import $ from "jquery"

export function getRandomColor () {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export async function getQuotes () {
  try {
    const jsonQuotes = await $.ajax({
      headers: {
        Accept: "application/json"
      },
      url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    })

    if (typeof jsonQuotes === "string") {
      const quotesData = JSON.parse(jsonQuotes)
      return quotesData
    } else {
      throw new Error("Invalid JSON format")
    }
  } catch (error) {
    throw new Error("Failed to fetch quotes: " + error.message)
  }
}
