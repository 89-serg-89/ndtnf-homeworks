import { ajax } from 'rxjs/ajax'

const urlGithub = 'https://api.github.com/search/repositories?q=vue'
const urlGitlub = 'https://gitlab.com/api/v4/projects?search=nest'

const github$ = ajax({
  url: urlGithub,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
})

const gitlub$ = ajax({
  url: urlGitlub,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
})

github$.subscribe(
  res => console.log(res),
  err => console.error(err)
)

gitlub$.subscribe(
  res => console.log(res),
  err => console.error(err)
)
