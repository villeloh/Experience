const startBox2 = document.getElementById("start-box-2");
const startBox1 = document.getElementById("start-box-1");
const button1 = document.getElementById("sheet-1");
const button2 = document.getElementById("sheet-2");
const button3 = document.getElementById("sheet-3");
const button = document.getElementById("piano");


button.onclick = function () {
    if (startBox2.className !== "piano") {
        startBox2.className = "piano";
        startBox1.innerHTML = "Piano keyboard";
        startBox2.innerHTML = `<p>For starters, it is useful to familiarize yourself
                               with the use of a piano keyboard. Suppose you are sitting at a piano and do not
                               know a single note. Here's what you see:</p>
                                           <img src="tutorials_img/1st_tut/keyboard_88full.jpg" class="tutorial_img">
                                           <p>The keyboard consists of black and
                               white keys, and black are arranged in groups of two and three, or, we can say,
                               pairs and triples. This grouping makes it easier to find any desired note. For
                               example, the nearest white key to the left of a pair of black keys is <i
                                                       style='mso-bidi-font-style:normal'>do</i>, or, using the letters of the Latin
                               alphabet, <i style='mso-bidi-font-style:normal'>C</i>. If you move from C in
                               the order of the Latin alphabet, the nearest white key to the left of the
                               triplet of black, is indicated by the letter F (or <i style='mso-bidi-font-style:
                               normal'>fa</i>). All notes can be indicated in double: letters of the Latin
                               alphabet or names <i style='mso-bidi-font-style:normal'>do, re, mi, fa,</i>
                               etc. The illustration below shows the correspondence of the names of notes and
                               their Latin notation:</p>
                                           <img src="tutorials_img/1st_tut/2-octave-piano-keys.jpg" class="tutorial_img">
                                           <p>On the standard keyboard 8 notes <i style='mso-bidi-font-style:
                               normal'>do</i> (C). The note C in the centre of the keyboard, or the fourth on
                               the left, is called &quot;C of the first octave / middle C&quot;. Although the
                               piano keyboard looks very large, in fact it consists of several repetitions of
                               the same group of notes. Five different black and seven different white keys
                               are those twelve tones based on which in music for centuries the melodies and
                               harmonies of all those symphonies and songs that you just heard were composed.</p>

                                           <div class="task_tutorials">
                                               <p><b>Task 1:</b> If you are
                               in front of instrument now, try playing all twelve notes, starting from <i
                                                       style='mso-bidi-font-style:normal'>do</i> (C) of the first octave, moving from
                               left to right or vice versa.</p>
                                           </div>

                                           <p>You'll notice that the sound of the white keys is no
                               different from the sound of the black ones: if you close your eyes and try to
                               distinguish sound by pressing a white key or a black one, you will hardly be
                               able to do it (of course, if you do not have an absolute hearing when you hear
                               exactly which one note play). The question arises: why do we need black and white
                               keys?</p>



                                           <p>There are two main reasons. First, if all the keys
                               were white, then the keyboard would be half wider. Black keys are so inserted
                               between the white ones that essentially do not take up space. Imagine only that
                               you need to try to put a piano that has 88 only white keys (which is a standard
                               number of keys) of the usual width, into your room! Even if your room is
                               spacious enough for this, try to imagine how you would play it without a chair
                               with wheels. Secondly, thanks to space-saving black keys, it is possible to
                               play one octave, or the distance from one <i style='mso-bidi-font-style:normal'>do</i>
                               (C) to another, or from one <i style='mso-bidi-font-style:normal'>re</i> (D) to
                               another. The octave interval is very important, because it can double any <span
                                                       class=GramE>particular sound</span>. Having learned to play melodies with
                               different fingers of the right hand, you can find it more interesting in some
                               places to play them in an octave.</p>

                                           <div class="task_tutorials">
                                               <p><b>Task 2:</b> All you
                               need to know now is the white key designation: <i style='mso-bidi-font-style:
                               normal'>do</i> (C),<i style='mso-bidi-font-style:normal'> re</i> (D), <i
                                                       style='mso-bidi-font-style:normal'>mi</i> (E), etc. Press any keys and try to
                               name them. You will be surprised how soon you will do it without the slightest
                               difficulty.</p>
                                               </div>

                                           <p>Now let's define the names for the black keys:</p>

                                           <p>Their name is formed from the whites closest to them.
                               The first black key on which the arrow points is between the notes <i
                                                       style='mso-bidi-font-style:normal'>do</i>(C) and <i style='mso-bidi-font-style:
                               normal'>re</i>(D) and can be called in two ways: <i style='mso-bidi-font-style:
                               normal'>do-diesis</i>(C#) and <i style='mso-bidi-font-style:normal'>re-<span
                                                       class=SpellE>bemolle</span></i>(Db).</p>

                                           <p>The <i>sharp</i>/#/<i>diesis</i> indicates the note's pitch is
                               increased by a half-ton, and the <i>flat</i>/b/<span class=SpellE><i>bemolle</i></span> is
                               correspondingly a half-tone sound reduction. Thus, the difference between the
                               notes <i>do</i>(C) and <i>re</i>(D) is a tone. More about this we will talk in the next lessons.</p>

                                           <p>The second arrow indicates the <i>re-<span class=GramE>diesis<span style='font-style:normal'>(</span></span></i>D
                               #)/<i>mi-<span class=SpellE>bemolle</span></i>(<span class=SpellE>Eb</span>) key, etc.</p>
                                           <img src="tutorials_img/1st_tut/octave-piano-keys.jpg" class="tutorial_img">

                                           <div class="task_tutorials">
                                               <p><b>Task 3:</b> Give the
                               name to the black keys yourself and check the correctness of your judgments
                               according to the picture.</p></div>
                               <p>For the sake of simplicity, the system of denotation of notes will be used only in Latin letters, so we advise you to get acquainted with it closer.</p>
                               `;
    }
};

button1.onclick = function () {
    if (startBox2.className !== "sheet-1") {
        startBox2.className = "sheet-1";
        startBox1.innerHTML = "Musical Notation";
        startBox2.innerHTML = `<h3>Learn the Basic Symbols of Notation</h3>
        <p>Music is made up of a variety of symbols, the most basic of which are the staff, the clefs and the notes. All music contains these fundamental components, and in order to learn how to read music, you must first familiarize yourself with these basics.</p>
        
        <h3>The Staff</h3>
        <p>The staff consists of five lines and four spaces. Each of those lines and each of those spaces represents a different letter, which in turn represents a note. Those lines and spaces represent notes named A-G, and the note sequence moves alphabetically up the staff.</p>
            <img src="tutorials_img/2nd_tut/Staff.jpg" class="tutorial_img">
        
        <h3>Treble Clef</h3>
        <p>There are two main clefs with which to familiarize yourself; the first is a treble clef. The treble clef has the ornamental letter G on the far-left side. The G’s inner swoop encircles the “G” line on the staff. The treble clef notates the higher registers of music, so if your instrument has a higher pitch, such as a flute, violin or saxophone, your sheet music is written in the treble clef.  Higher notes on a keyboard also are notated on the treble clef.</p>
            <img src="tutorials_img/2nd_tut/Clef.jpg" class="tutorial_img">
        <p>We use common mnemonics to remember the note names for the lines and spaces of the treble clef. For lines, we remember EGBDF by the word cue “Every Good Boy Does Fine.” Similarly for the spaces, FACE is just like the word “face.”</p>
        
        <h3>Bass Clef</h3>
        <p>The line between the two bass clef dots is the “F” line on the bass clef staff, and it’s also referred to as the F clef. The bass clef notates the lower registers of music, so if your instrument has a lower pitch, such as a bassoon, tuba or cello, your sheet music is written in the bass clef. Lower notes on your keyboard also are notated in the bass clef.</p>
            <img src="tutorials_img/2nd_tut/Bass.jpg" class="tutorial_img">
        <p>A common mnemonic to remember note names for the lines of the bass clef is: GBDFA “Good Boys Do Fine Always.” And for the spaces: ACEG, “All Cows Eat Grass.”</p>
        
        <h3>Notes</h3>
        <p>Notes placed on the staff tell us which note letter to play on our instrument and how long to play it. There are three parts of each note, the note head, the stem and the flag.</p>
               <img src="tutorials_img/2nd_tut/Notes.jpg" class="tutorial_img"> 
        <p>Every note has a note head, either filled (black) or open (white). Where the note head sits on the staff (either on a line or a space) determines which note you will play. Sometimes, note heads will sit above or below the five lines and four spaces of a staff. In that case, a line is drawn through the note, above the note or below the note head, to indicate the note letter to play, as in the B and C notes above.</p>
        <p>The note stem is a thin line that extends either up or down from the note head. The line extends from the right if pointing upward or from the left if pointing downward. The direction of the line doesn’t affect how you play the note, but serves as a way to make the notes easier to read while allowing them to fit neatly on the staff. As a rule, any notes at or above the B line on the staff have downward pointing stems, those notes below the B line have upward pointing stems.</p>
        <p>The note flag is a curvy mark to the right of the note stem. Its purpose is to tell you how long to hold a note. We’ll see below how a single flag shortens the note’s duration, while multiple flags can make it shorter still.</p>
            <img src="tutorials_img/2nd_tut/Values.jpg" class="tutorial_img"> 
        <p>Now that you know the parts to each note, we’ll take a closer look at those filled and open note heads discussed above. Whether a note head is filled or open shows us the note’s value, or how long that note should be held. Start with a closed note head with a stem. That’s our quarter note, and it gets one beat. An open note head with a stem is a half note, and it gets two beats. An open note that looks like an “o” without a stem is a whole note, and it gets held for four beats.</p>
            <img src="tutorials_img/2nd_tut/dots.jpg" class="tutorial_img">
        <p>There are other ways to extend the length of a note. A dot after the note head, for example, adds another half of that note’s duration to it. So, a half note with a dot would equal a half note and a quarter note; a quarter note with a dot equals a quarter plus an eighth note. A tie may also be used to extend a note. Two notes tied together should be held as long as the value of both of those notes together, and ties are commonly used to signify held notes that cross measures or bars.</p>
            <img src="tutorials_img/2nd_tut/val.jpg" class="tutorial_img" > </br>
            <img src="tutorials_img/2nd_tut/beaming.jpg" class="tutorial_img">
        <p>The opposite may also happen, we can shorten the amount of time a note should be held, relative to the quarter note. Faster notes are signified with either flags, like the ones discussed above, or with beams between the notes. Each flag halves the value of a note, so a single flag signifies 1/2 of a quarter note, a double flag halves that to 1/4 of a quarter note, et cetera. Beams do the same, while allowing us to read the music more clearly and keep the notation less cluttered. As you can see, there’s no difference in how you count the eighth and 16th notes above. </p>
        <p>But what happens when there isn’t a note taking up each beat? It’s easy, we take a rest! A rest, just like a note, shows us how long it should be held based on its shape.</p>
            <img src="tutorials_img/2nd_tut/10.jpg" class="tutorial_img"></br>`;
    }
};

button2.onclick = function () {
    if (startBox2.className !== "sheet-2") {
        startBox2.className = "sheet-2";
        startBox1.innerHTML = "Pick Up the Beat";
        startBox2.innerHTML = `<p>In order to play music, you need to know its meter, the beat you use when dancing, clapping or tapping your foot along with a song. When reading music, the meter is presented similar to a fraction, with a top number and a bottom number, we call this the song’s time signature. The top number tells you how many beats to a measure, the space of staff in between each vertical line (called a bar). The bottom number tells you the note value for a single beat, the pulse your foot taps along with while listening.</p>
        <img src="tutorials_img/3rd_tut/Twinkle.jpg" class="tutorial_img"></br>
        <iframe class="tutorial_img" src="https://www.youtube.com/watch?v=QzfaE3RAQlM" ></iframe>
        <p>In the example above, the time signature is 4/4, meaning there are 4 beats per bar and that every quarter note gets one beat.</p>
        <div class="task_tutorials"><p>Try counting along 1,2,3,4 – 1,2,3,4 with the beat numbers above.</p></div> 
        <p>In the example below, the time signature is 3/4, meaning there are 3 beats per bar and that every quarter note gets one beat. </p>         
        <img src="tutorials_img/3rd_tut/Over the river.jpg" class="tutorial_img"></br>
        <iframe class="tutorial_img" src="https://www.youtube.com/watch?v=jxOYykITrmo"></iframe>
        <div class="task_tutorials"><p>Try counting the beats, 1,2,3 – 1,2,3.</p></div>
        <p>Let’s look again at the above examples, notice that even though the 4/4 time signature in “Twinkle, Twinkle Little Star” calls for 4 beats per bar, there aren’t 4 notes in second bar? That’s because you have two quarter notes and one half note, which added together equal 4 beats. In addition to your note values and time signature, the last piece to feeling the rhythm is knowing your tempo, or beats per minute. Tempo tells you how fast or slow a piece is intended to be played, and often is shown at the top of a piece of sheet music. A tempo of, say 60 BPM (beats per minute) would mean you’d play 60 of the signified notes every minute or a single note every second. Likewise, a tempo of 120 would double the speed at 2 notes every second.  You may also see Italian words like “Largo,” “Allegro” or “Presto” at the top of your sheet music, which signify common tempos. Musicians use a tool, called a metronome, to help them keep tempo while practicing a new piece.</p>
        <img src="tutorials_img/3rd_tut/Tempo.jpg" class="tutorial_img"></br>`;
    }
};

button3.onclick = function () {
    if (startBox2.className !== "sheet-2") {
        startBox2.className = "sheet-2";
        startBox1.innerHTML = "Play a melody";
        startBox2.innerHTML = `<p>There’s one more symbol to learn regarding semitones, and that’s the natural, denoted by a ♮. If a note is sharp or flat, that sharp or flat extends throughout the measure, unless there’s a natural symbol. A natural  cancels a sharp or flat within a measure or a song. Here’s what playing C to E would look like with natural symbols.There’s one more symbol to learn regarding semitones, and that’s the natural, denoted by a ♮. If a note is sharp or flat, that sharp or flat extends throughout the measure, unless there’s a natural symbol. A natural  cancels a sharp or flat within a measure or a song. Here’s what playing C to E would look like with natural symbols.</p>        
        <img src="tutorials_img/4th_tut/Naturals.jpg" class="tutorial_img" >
        <p>Finally, in order to read music, you’ll need to understand key signatures. You actually already know one key signature, the key of C! The C major scale you learned above was in the key of C. Scales are named after their tonic, the preeminent note within the scale, and the tonic determines what key you play in. You can start a major scale on any note, so long as you follow the whole-whole-half-whole-whole-whole-half pattern. Now, following that pattern in keys other than the key of C will require you to use sharps and flats. Since that’s the case, we place the sharps or flats for your song’s key signature right before the meter, after the clef, on your sheet music. That tells you to maintain those sharps or flats throughout the music, unless of course there’s a natural symbol to override it. You will begin to recognize the key signatures of pieces based on what sharps or flats are shown. Here’s a quick glimpse at some key signatures using sharps and flats:</p>
        <div class = "img_place">
        <img src="tutorials_img/4th_tut/Sharps.jpg" class="tutorial_img"> </br>
        <img src="tutorials_img/4th_tut/Flats.jpg" class="tutorial_img">
        <p style="clear: both;">
        </div>
        `;
    }
};