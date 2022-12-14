const list = document.getElementById('list');
const links = [
  {
    label: "Week 1 - Notes",
    url: "week01/index.html"
  },
  {
    label: "Week 1 - Story Writter",
    url: "week01/story_editor.html"
  },
  {
    label: "Week 2 - Notes",
    url: "week02/index.html"
  },
  {
    label: "Week 2 - Group Activity",
    url: "week02/group/index.html"
  },
  {
    label: "Week 2 - Quiz Ninja",
    url: "week02/quiz/index.html"
  },
  {
    label: "Week 3 - Notes",
    url: "week03/index.html"
  },
  {
    label: "Week 3 - Group Activity",
    url: "week03/group/Array Cardio 💪.html"
  },
  {
    label: "Week 3 - Group Activity Stretch Goals",
    url: "week03/group/Array Cardio 💪💪.html"
  },
  {
    label: "Week 3 - Quiz Ninja",
    url: "week03/quiz/index.html"
  },
  {
    label: "Week 4 - Notes",
    url: "week04/index.html"
  },
  {
    label: "Week 4 - Quiz Ninja (Part 1)",
    url: "week04/quiz_1/index.html"
  },
  {
    label: "Week 4 - Quiz Ninja (Part 2)",
    url: "week04/quiz_2/index.html"
  },
  {
    label: "Week 4 - Group Activity",
    url: "week04/group/index.html"
  },
  {
    label: "Week 5 - Notes",
    url: "week05/index.html"
  },
  {
    label: "Week 5 - Group Activity",
    url: "week05/group/index.html"
  },
  {
    label: "Challenge 1",
    url: "challenge1/index.html"
  },
  {
    label: "Week 7 - Notes",
    url: "week07/index.html"
  },
  {
    label: "Week 7 - Quiz Ninja",
    url: "week07/quiz/index.html"
  },
  {
    label: "Week 8 - Notes",
    url: "week08/index.html"
  },
  {
    label: "Week 8 - Group Activity",
    url: "week08/group/index.html"
  },
  {
    label: "Week 9 - Notes",
    url: "week09/index.html"
  },
  {
    label: "Week 9 - Group Activity",
    url: "week09/group/index.html"
  },
  {
    label: "Week 10 - Notes",
    url: "week10/index.html"
  },
  {
    label: "Week 10 - Group Activity",
    url: "week10/group/index.html"
  },
  {
    label: "Week 11 - Group Activity",
    url: "week11/group/client/index.html"
  },
  {
    label: "Challenge 2",
    url: "challenge2/app/index.html"
  }
]

function createListItems(list, items) {
  items.forEach((item) => {
    let li = document.createElement('li')
    let a = document.createElement('a')
    let linkText = document.createTextNode(item.label)
    a.appendChild(linkText)
    a.href = "./" + item.url
    list.appendChild(li).appendChild(a)
  })
}

createListItems(list, links)