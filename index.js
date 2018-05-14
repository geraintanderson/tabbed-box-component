!function() {
  var apiRoute = 'https://jsonplaceholder.typicode.com/posts/'
  var apiResources = {
    'tab-op-new': '1',
    'tab-op-switch': '2',
    'tab-op-charity': '3',
    'tab-op-existing': '4'
  }

  function onSelectTab (elemId) {
    return function (clickEvent) {
      setSelected(elemId)
      getApiContent(elemId)
    }
  }

  function setSelected (elemId) {
    // Unselect previously selected elements
    var selectedElements = document.getElementsByClassName('selected')
    for (var i = 0; i < selectedElements.length; i++) {
      selectedElements[i].className = selectedElements[i].className.replace(/\bselected\b/g, '')
    }
    // Add the selected class to the chosen element
    document.getElementById(elemId).classList.add('selected')
  }

  function getApiContent (tabId) {
    var apiReq = new XMLHttpRequest()

    apiReq.addEventListener('error', showError)

    apiReq.addEventListener('load', function () {
      var response
      try {
        response = JSON.parse(this.responseText)
      } catch (e) {
        showError()
      }

      var container = document.getElementById('api-content')
      var title = document.createElement('h1')
      title.textContent = response.title
      var para = document.createElement('p')
      para.textContent = response.body

      container.innerHTML = ''
      container.appendChild(title)
      container.appendChild(para)

    })

    apiReq.open('GET', apiRoute + apiResources[tabId])
    apiReq.send()
  }

  function showError (e) {
    var container = document.getElementById('api-content')
    var title = document.createElement('h1')
    title.textContent = 'There was a problem loading the data.'
    var para = document.createElement('p')
    para.textContent = 'The page cannot be loaded. '
    var link = document.createElement('a')
    link.textContent = 'Click here to get in touch with us, whether it\'s by phone, face to face in one of our branches or by writing'
    link.href = 'https://www.co-operativebank.co.uk/business/customerservices/contactus'
    link.appendChild(document.createTextNode('.'))

    container.innerHTML = ''
    container.appendChild(title)
    para.appendChild(link)
    container.appendChild(para)
  }

  window.onload = function () {
    console.log('loaded')

    var tabBoxElements = document.getElementsByClassName('tab-box')
    for (var i = 0; i < tabBoxElements.length; i++) {
      tabBoxElements[i].onclick = onSelectTab(tabBoxElements[i].id)
    }
  }
}()
