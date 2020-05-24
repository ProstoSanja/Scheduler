function getTimesFromEntry(entry) {
  if (!entry) {
    // TODO: lol
    return [0,0];
  }
  var start = entry.start.toMillis();
  var end = start + entry.length*1000;
  return [start, end];
}

// TODO: this needs to be done correctly
function entriesEqual(entry1, entry2) {
  var st1 = JSON.stringify(entry1)
  var st2 = JSON.stringify(entry2)
  return st1 === st2;
}

function getByTimeFromArray(schedule, now) {
  for (let i = 0; i < schedule.length; i++) {
    const entry = schedule[i];
    var [start, end] = getTimesFromEntry(entry);
    if (start <= now && end > now) {
      return [entry, i];
    } else if (start > now) {
      return [null, i-1];
    }
  }
  return [null, -1];
}

export { getTimesFromEntry, entriesEqual, getByTimeFromArray };