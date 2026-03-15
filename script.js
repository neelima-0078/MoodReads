/* ============================================================
   MoodReads — script.js  (Startup UI Redesign)
   Handles: mood selection, text-input mood detection,
            book rendering, navigation, nav scroll effect.
   ============================================================ */

/* ── 1. BOOK DATABASE ── */
const booksByMood = {
  cozy: [
    {
      title: "Anne of Green Gables",
      author: "L. M. Montgomery",
      genre: "Coming-of-Age",
      summary: "Anne Shirley, a spirited red-haired orphan, is mistakenly sent to elderly siblings Marilla and Matthew Cuthbert on Prince Edward Island. Her imaginative outlook and warm heart slowly win over even the most reserved neighbours, turning a small farm into a true home. A gentle, heartwarming story perfect for a quiet afternoon.",
      url: "https://www.gutenberg.org/ebooks/45"
    },
    {
      title: "Little Women",
      author: "Louisa May Alcott",
      genre: "Family Fiction",
      summary: "Follow the four March sisters — Meg, Jo, Beth, and Amy — as they grow up in Civil-War-era New England while their father serves away. Full of domestic warmth, sisterly banter, small joys, and gentle life lessons, this beloved classic wraps around you like a quilt on a rainy day.",
      url: "https://www.gutenberg.org/ebooks/514"
    },
    {
      title: "Emma",
      author: "Jane Austen",
      genre: "Social Comedy",
      summary: "Clever and comfortably wealthy Emma Woodhouse fancies herself an expert matchmaker in the cosy village of Highbury. Her well-meaning meddling leads to delightful misunderstandings and romantic confusion. Austen's warmest novel brims with wit, neighbourly gossip, and gentle humour.",
      url: "https://www.gutenberg.org/ebooks/158"
    },
    {
      title: "The Wind in the Willows",
      author: "Kenneth Grahame",
      genre: "Classic Fantasy",
      summary: "Mole, Rat, Badger, and the irrepressible Toad live along a peaceful riverbank, enjoying picnics, boat trips, and fireside evenings. When Toad's obsession with motorcars lands him in trouble, his friends rally to save Toad Hall. Perfectly cosy and endlessly charming.",
      url: "https://www.gutenberg.org/ebooks/289"
    },
    {
      title: "Cranford",
      author: "Elizabeth Gaskell",
      genre: "Domestic Fiction",
      summary: "A charming sketch of life in a small English town governed by its genteel, mostly female inhabitants. Miss Matty and her friends navigate tight finances, small dramas, and big-hearted kindness with quiet dignity. Gaskell's prose is as cosy as the drawing rooms she describes.",
      url: "https://www.gutenberg.org/ebooks/394"
    }
  ],
  sad: [
    {
      title: "The Sorrows of Young Werther",
      author: "Johann Wolfgang von Goethe",
      genre: "Epistolary Novel",
      summary: "Told through letters, this novel follows Werther, a sensitive young artist who falls hopelessly in love with Charlotte, a woman already engaged to another. His consuming passion isolates him and pulls him toward despair. A foundational text of Romantic melancholy that still resonates today.",
      url: "https://www.gutenberg.org/ebooks/2527"
    },
    {
      title: "The Awakening",
      author: "Kate Chopin",
      genre: "Literary Fiction",
      summary: "Edna Pontellier, a Creole wife and mother in 1890s New Orleans, begins to question the domestic role society has assigned her. Her slow, painful awakening to her own desires and identity unfolds against the languid Louisiana coast. Bold, beautiful, and quietly devastating.",
      url: "https://www.gutenberg.org/ebooks/160"
    },
    {
      title: "Ethan Frome",
      author: "Edith Wharton",
      genre: "Novella",
      summary: "In a bleak New England winter, taciturn farmer Ethan Frome is trapped in a loveless marriage and grinding hardship. His secret love for his wife's cousin offers a brief glimpse of warmth before fate closes in. A spare, icy masterpiece of thwarted longing.",
      url: "https://www.gutenberg.org/ebooks/4517"
    },
    {
      title: "The Old Man and the Sea",
      author: "Ernest Hemingway",
      genre: "Novella",
      summary: "Ageing Cuban fisherman Santiago rows alone far out to sea and hooks a magnificent marlin. Over three days and nights he struggles with the fish, the ocean, and his own failing body. A moving meditation on endurance, pride, and the dignity of losing well.",
      url: "https://www.gutenberg.org/ebooks/2185"
    }
  ],
  romantic: [
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      summary: "The witty Elizabeth Bennet and the proud, wealthy Mr Darcy clash spectacularly at first acquaintance. As misunderstandings and family dramas unfold, their mutual pride melts into genuine affection. Austen's most beloved novel is a perfect portrait of love earned through self-knowledge and wit.",
      url: "https://www.gutenberg.org/ebooks/1342"
    },
    {
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      genre: "Gothic Romance",
      summary: "Orphaned Jane Eyre grows into a fiercely independent young woman and takes a post as governess at the brooding Thornfield Hall. Her relationship with the dark, magnetic Mr Rochester is intense, passionate, and shadowed by secrets. A foundational love story charged with thunder and self-respect.",
      url: "https://www.gutenberg.org/ebooks/1260"
    },
    {
      title: "Wuthering Heights",
      author: "Emily Brontë",
      genre: "Gothic Romance",
      summary: "The fierce bond between Catherine Earnshaw and the foundling Heathcliff consumes both their lives and echoes through the next generation. Set on the wild Yorkshire moors, this is one of literature's most intense and destructive love stories — beautiful, ruthless, and unforgettable.",
      url: "https://www.gutenberg.org/ebooks/768"
    },
    {
      title: "North and South",
      author: "Elizabeth Gaskell",
      genre: "Social Romance",
      summary: "Margaret Hale moves from a quiet country parsonage to the gritty industrial North and clashes with mill owner John Thornton. Over time, mutual misunderstanding gives way to deep respect and love. A satisfying, socially rich romance with real emotional depth.",
      url: "https://www.gutenberg.org/ebooks/4276"
    },
    {
      title: "Sense and Sensibility",
      author: "Jane Austen",
      genre: "Romance",
      summary: "Sisters Elinor and Marianne Dashwood embody opposite approaches to love: cautious reason versus passionate feeling. When both fall for unsuitable men, their hearts are tested in different ways. Austen balances comedy and heartbreak with exquisite control.",
      url: "https://www.gutenberg.org/ebooks/161"
    }
  ],
  motivated: [
    {
      title: "Walden",
      author: "Henry David Thoreau",
      genre: "Philosophical Memoir",
      summary: "Thoreau spent two years living alone in a cabin by Walden Pond, recording observations of nature and his reflections on deliberate, purposeful living. His call to simplify and live fully and intentionally remains strikingly relevant. A quiet manifesto for anyone craving a reset.",
      url: "https://www.gutenberg.org/ebooks/205"
    },
    {
      title: "The Autobiography of Benjamin Franklin",
      author: "Benjamin Franklin",
      genre: "Autobiography",
      summary: "Franklin's account of his rise from humble origins through industry, curiosity, and relentless self-improvement is one of history's great motivational stories. He charts his famous thirteen virtues and his journey from printer's apprentice to statesman. Practical, witty, and remarkably timeless.",
      url: "https://www.gutenberg.org/ebooks/20203"
    },
    {
      title: "Up from Slavery",
      author: "Booker T. Washington",
      genre: "Autobiography",
      summary: "Born into slavery, Washington describes his arduous journey to found the Tuskegee Institute and become one of America's most influential educators. Written with dignity and quiet determination, it is a testament to what perseverance and vision can achieve against overwhelming odds.",
      url: "https://www.gutenberg.org/ebooks/2376"
    },
    {
      title: "Self-Reliance",
      author: "Ralph Waldo Emerson",
      genre: "Philosophy / Essay",
      summary: "Emerson's most famous essay argues passionately that every individual must trust their own instincts and resist conformity. Written in a charged, aphoristic style, it urges readers to live boldly and authentically. Few texts are better suited to lighting a fire under a restless soul.",
      url: "https://www.gutenberg.org/ebooks/16643"
    }
  ],
  curious: [
    {
      title: "The Adventures of Sherlock Holmes",
      author: "Arthur Conan Doyle",
      genre: "Detective Fiction",
      summary: "Twelve classic short stories follow the brilliant Sherlock Holmes and his loyal friend Dr Watson as they unravel London's most baffling mysteries. Holmes's razor-sharp deductions and eccentric genius make every case a delight for the inquisitive reader.",
      url: "https://www.gutenberg.org/ebooks/1661"
    },
    {
      title: "The Time Machine",
      author: "H. G. Wells",
      genre: "Science Fiction",
      summary: "A Victorian inventor travels eight hundred thousand years into the future and discovers a world split between the gentle Eloi and the sinister Morlocks. Wells uses time travel as a vehicle for sharp ideas about class, evolution, and entropy.",
      url: "https://www.gutenberg.org/ebooks/35"
    },
    {
      title: "Twenty Thousand Leagues Under the Sea",
      author: "Jules Verne",
      genre: "Adventure / Sci-Fi",
      summary: "Marine biologist Professor Aronnax finds himself aboard the Nautilus, the submarine of the mysterious Captain Nemo. Together they journey through every ocean, encountering giant squids, lost civilisations, and polar ice. A thrilling feast of scientific imagination and wonder.",
      url: "https://www.gutenberg.org/ebooks/164"
    },
    {
      title: "Alice's Adventures in Wonderland",
      author: "Lewis Carroll",
      genre: "Fantasy",
      summary: "Alice tumbles down a rabbit hole into a world of delightful nonsense — talking animals, a Mad Hatter's tea party, a tyrannical Queen of Hearts. Carroll's absurdist logic masks sharp observations about identity and authority. Endlessly clever.",
      url: "https://www.gutenberg.org/ebooks/11"
    },
    {
      title: "The Origin of Species",
      author: "Charles Darwin",
      genre: "Natural Science",
      summary: "Darwin's landmark 1859 work lays out the evidence for evolution by natural selection in clear, persuasive prose. Packed with observations from barnacles to pigeons, it remains one of the most consequential — and surprisingly readable — works of non-fiction ever written.",
      url: "https://www.gutenberg.org/ebooks/1228"
    }
  ],
  escapist: [
    {
      title: "Dracula",
      author: "Bram Stoker",
      genre: "Gothic Horror",
      summary: "Solicitor Jonathan Harker travels to Transylvania and discovers his client Count Dracula is no ordinary nobleman. As Dracula descends on London, a band of friends race to stop him. Told through diaries and letters, it remains viscerally thrilling.",
      url: "https://www.gutenberg.org/ebooks/345"
    },
    {
      title: "Frankenstein",
      author: "Mary Shelley",
      genre: "Gothic Horror / Sci-Fi",
      summary: "Young scientist Victor Frankenstein assembles life from dead matter, only to flee his creation in horror. The Creature, abandoned and vilified, turns monstrous in his loneliness. Shelley's novel questions what it means to create, to parent, and to be human.",
      url: "https://www.gutenberg.org/ebooks/84"
    },
    {
      title: "Treasure Island",
      author: "Robert Louis Stevenson",
      genre: "Adventure",
      summary: "Young Jim Hawkins stumbles upon a treasure map and sails to a remote island with a crew that includes the charismatic, treacherous Long John Silver. Packed with mutiny, buried gold, and sea air — this is the definitive pirate adventure.",
      url: "https://www.gutenberg.org/ebooks/120"
    },
    {
      title: "The Invisible Man",
      author: "H. G. Wells",
      genre: "Science Fiction",
      summary: "A scientist discovers a way to render himself invisible, believing it will give him power and freedom. Instead, his invisibility isolates him and feeds his darkest impulses. Part chase thriller, part psychological study — breathless from start to finish.",
      url: "https://www.gutenberg.org/ebooks/5230"
    },
    {
      title: "The Mysterious Island",
      author: "Jules Verne",
      genre: "Adventure / Sci-Fi",
      summary: "Five castaways escape by balloon and land on an uncharted volcanic island. Using ingenuity and teamwork, they build a civilisation from scratch — while sensing they are watched by a mysterious benefactor. Verne's most optimistic, inventive adventure.",
      url: "https://www.gutenberg.org/ebooks/1268"
    }
  ],
  thoughtful: [
    {
      title: "Meditations",
      author: "Marcus Aurelius",
      genre: "Philosophy",
      summary: "The private journal of a Roman emperor, never intended for publication. Marcus Aurelius wrestles daily with Stoic principles: how to meet adversity calmly, act justly, and accept mortality. These short, honest reflections have guided readers for two thousand years.",
      url: "https://www.gutenberg.org/ebooks/2680"
    },
    {
      title: "Siddhartha",
      author: "Hermann Hesse",
      genre: "Philosophical Fiction",
      summary: "A young Brahmin named Siddhartha leaves home to seek enlightenment, moving through asceticism, sensuality, and worldly success before finding peace by a river. Hesse's luminous, spare prose makes this short novel a quiet revolution in the reader's sense of what matters.",
      url: "https://www.gutenberg.org/ebooks/2500"
    },
    {
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      genre: "Literary Fiction",
      summary: "Three brothers are entangled in their father's murder. Dostoevsky uses the crime to explore the deepest questions of faith, suffering, free will, and redemption. Monumental, demanding, and profoundly rewarding.",
      url: "https://www.gutenberg.org/ebooks/28054"
    },
    {
      title: "Thus Spoke Zarathustra",
      author: "Friedrich Nietzsche",
      genre: "Philosophical Fiction",
      summary: "Nietzsche's prophet Zarathustra descends from his mountain to teach the world of the overman, eternal recurrence, and the will to power. Written in soaring, biblical prose, it challenges every comfortable assumption about morality and the purpose of a human life.",
      url: "https://www.gutenberg.org/ebooks/1998"
    },
    {
      title: "Essays",
      author: "Michel de Montaigne",
      genre: "Essays / Philosophy",
      summary: "Montaigne invented the personal essay and remains one of its greatest practitioners. Writing about everything from cannibals to conversation, he uses himself as his subject to probe what it means to live wisely and humanely.",
      url: "https://www.gutenberg.org/ebooks/3600"
    }
  ]
};

/* ── 2. KEYWORD MAP for free-text detection ── */
const moodKeywords = {
  cozy:       ["cozy","cosy","warm","comfortable","peaceful","relaxed","calm","snug","quiet","safe","home"],
  sad:        ["sad","down","blue","melancholy","unhappy","depressed","heartbroken","lonely","lost","gloomy","tearful","low"],
  romantic:   ["romantic","love","crush","longing","passionate","tender","heart","infatuated","smitten","dating","relationship"],
  motivated:  ["motivated","productive","ambitious","driven","inspired","focused","energised","energized","determined","goal","achieve","hustle"],
  curious:    ["curious","inquisitive","wondering","interested","fascinated","nosy","questioning","exploratory","intellectual","learning","investigative"],
  escapist:   ["escapist","escape","adventure","thrill","bored","exciting","fantasy","action","explore","wander","flight","restless"],
  thoughtful: ["thoughtful","pensive","reflective","philosophical","introspective","meditative","deep","contemplative","nostalgic","meaning","purpose"]
};

/* ── 3. DOM ELEMENTS ── */
const moodSection    = document.getElementById("moodSection");
const resultsSection = document.getElementById("resultsSection");
const resultsTitle   = document.getElementById("resultsTitle");
const booksGrid      = document.getElementById("booksGrid");
const backBtn        = document.getElementById("backBtn");
const moodInput      = document.getElementById("moodInput");
const moodSearchBtn  = document.getElementById("moodSearchBtn");
const moodButtons    = document.querySelectorAll(".mood-btn");
const navEl          = document.getElementById("nav");

/* ── NAV SCROLL EFFECT ── */
window.addEventListener("scroll", () => {
  if (!navEl) return;
  window.scrollY > 30 ? navEl.classList.add("scrolled") : navEl.classList.remove("scrolled");
}, { passive: true });

/* ── 4. RENDER BOOKS ── */
function showBooks(moodKey, label) {
  const books = booksByMood[moodKey];
  if (!books) return;

  resultsTitle.textContent = `Books for when you feel ${label}`;
  booksGrid.innerHTML = "";

  books.forEach((book, i) => {
    const card = document.createElement("article");
    card.className = "book-card";
    card.style.animationDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <span class="book-genre-badge">${esc(book.genre)}</span>
      <h3 class="book-title">${esc(book.title)}</h3>
      <p  class="book-author">by ${esc(book.author)}</p>
      <p  class="book-summary">${esc(book.summary)}</p>
      <a  class="read-btn"
          href="${book.url}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read ${esc(book.title)} on Project Gutenberg">
        ↗ Read on Gutenberg
      </a>
    `;
    booksGrid.appendChild(card);
  });

  moodSection.style.display    = "none";
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── 5. MOOD BUTTON HANDLERS ── */
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const mood  = btn.dataset.mood;
    const label = btn.querySelector(".mood-label").textContent;

    moodButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    setTimeout(() => showBooks(mood, label), 160);
  });
});

/* ── 6. FREE-TEXT MOOD DETECTION ── */
function detectMood(text) {
  const lower = text.toLowerCase();
  let best = null, score = 0;
  for (const [mood, kws] of Object.entries(moodKeywords)) {
    const s = kws.filter(kw => lower.includes(kw)).length;
    if (s > score) { score = s; best = mood; }
  }
  return score > 0 ? best : null;
}

moodSearchBtn.addEventListener("click", handleTextSearch);
moodInput.addEventListener("keydown", e => { if (e.key === "Enter") handleTextSearch(); });

function handleTextSearch() {
  const text = moodInput.value.trim();
  if (!text) { shake(moodInput); return; }

  const detected = detectMood(text);
  if (detected) {
    showBooks(detected, `"${text}"`);
  } else {
    /* Fallback to curious */
    showBooks("curious", `"${text}"`);
  }
}

/* ── 7. BACK BUTTON ── */
backBtn.addEventListener("click", () => {
  resultsSection.style.display = "none";
  moodSection.style.display    = "";
  moodButtons.forEach(b => b.classList.remove("active"));
  moodSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* ── 8. HELPERS ── */
function esc(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

function shake(el) {
  const moves = ["-7px","7px","-5px","5px","0px"];
  let i = 0;
  el.style.transition = "transform 0.08s ease";
  const id = setInterval(() => {
    el.style.transform = `translateX(${moves[i++]})`;
    if (i >= moves.length) { clearInterval(id); el.style.transform = ""; }
  }, 55);
  el.focus();
}

/* ── 9. NAV: smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
