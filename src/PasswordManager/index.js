import {Component} from 'react'

import {v4} from 'uuid'

import PasswordListItem from '../PasswordListItem/index'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    url: '',
    userName: '',
    password: '',
    passwordsList: [],
    isShowPassword: false,
    searchInput: '',
  }

  onChangeUrl = event => {
    this.setState({url: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderNoPasswordsListView = () => {
    const {passwordsList} = this.state

    return (
      <div className="no-passwords-view-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-img"
        />
        <p className="no-passwords">No Passwords</p>
      </div>
    )
  }

  renderPasswordsListItemsView = searchResults => {
    const {passwordsList, isShowPassword} = this.state

    return searchResults.map(eachPasswordItem => (
      <PasswordListItem
        key={eachPasswordItem.id}
        passwordItemDetails={eachPasswordItem}
        deletePassword={this.deletePassword}
        isShowPassword={isShowPassword}
      />
    ))
  }

  onAddPasswordItem = event => {
    event.preventDefault()

    const {url, userName, password, passwordsList, isShowPassword} = this.state

    const newPasswordItem = {
      id: v4(),
      url,
      userName,
      password,
      initialContainerBackgroundClassName:
        initialContainerBackgroundClassNames[
          Math.ceil(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ],
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      url: '',
      userName: '',
      password: '',
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachPasswordItem => eachPasswordItem.id !== id,
      ),
    }))
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  getSearchResults = () => {
    const {searchInput, passwordsList} = this.state

    const searchResults = passwordsList.filter(eachPasswordItem =>
      eachPasswordItem.url.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return searchResults
  }

  render() {
    const {
      url,
      userName,
      password,
      passwordsList,
      isShowPassword,
      searchInput,
    } = this.state

    const searchResults = this.getSearchResults()
    const lengthOfPasswordsList = searchResults.length

    return (
      <div className="password-manager-app-container">
        <div className="password-manager-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="cards-container password-manager-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img-small"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img-lg"
          />
          <form
            className="password-manager-input-container"
            onSubmit={this.onAddPasswordItem}
          >
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-img"
              />
              <input
                type="text"
                value={url}
                placeholder="Enter Website"
                className="input-name"
                onChange={this.onChangeUrl}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-img"
              />
              <input
                type="text"
                value={userName}
                placeholder="Enter Username"
                className="input-name"
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-img"
              />
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                className="input-name"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="add-btn-card">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="cards-container your-passwords-search-and-list-card">
          <div className="your-passwords-search-container">
            <h1 className="your-passwords">
              Your Passwords
              <p className="passwords-count">{lengthOfPasswordsList}</p>
            </h1>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-box-container">
            <input
              type="checkbox"
              id="show"
              name="Passwords"
              className="checkbox"
              value={isShowPassword}
              onClick={this.onClickShowPassword}
            />
            <label className="label-name" htmlFor="show">
              Show Passwords
            </label>
          </div>
          <ul className="passwords-list-container">
            {lengthOfPasswordsList > 0
              ? this.renderPasswordsListItemsView(searchResults)
              : this.renderNoPasswordsListView()}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
