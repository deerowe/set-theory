function noteToNum(note) {
    notenums = {
        'C': 0,
        'D': 2,
        'E': 4,
        'F': 5,
        'G': 7,
        'A': 9,
        'B': 11
    }
    letter = note[0].toUpperCase()
    accidentals = note.slice(1, note.length)
    
    accidentaladd = 0
    for (i in accidentals) {
        currentaccidental = accidentals[i].toLowerCase()
        
        if (currentaccidental == 'b') {
            accidentaladd -= 1
        } else if (currentaccidental == '#') {
            accidentaladd += 1
        } else if (currentaccidental == 'x') {
            accidentaladd += 2
        }
    }
    
    num = notenums[letter] + accidentaladd
    
    while (num < 0 ) {
        num += 12
    }
    
    num = num % 12
    
    return num;
}

function notesToSet(notes) {
    set = []
    for (i in notes) {
        note = notes[i]
        set.push(noteToNum(note))
    }
    
    return set
    
}

function gradeSet(set) {
    grade = 0
    for (i = 0; i < set.length - 1; i++) {
        grade += (set[i + 1] - set[0]) * Math.pow(10, i)  
    }
    return grade
}

function normalize(set) {
    // TODO use grade() to find best
    set.sort(function(a, b){return a-b});
    
    bestdist = 99
    bestset = []
    for (i in set) {
        dist = set[set.length - 1] - set[0]
        
        zeroset = []
        for (x in set) {
            zeroset.push(set[x] - set[0])
        }
        
        if (dist < bestdist) {
            bestdist = dist
            bestset = zeroset
        }
        
        set.push(set[0] + 12)
        set.shift()
    }
    
    
    return bestset
}

function prime(normalizedset) {
    reversed = [0]
    for (i = normalizedset.length - 1; i > 0; i--) {
        difference = normalizedset[i] - normalizedset[i - 1]
        reversed.push(reversed[reversed.length - 1] + difference)
    }
    
    if (gradeSet(normalizedset) > gradeSet(reversed)) {
        return reversed
    } else {
        return normalizedset
    }
}

function notesToPrime(notes) {
    return prime(normalize(notesToSet(notes)))
}
