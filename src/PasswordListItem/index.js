import './index.css'

const PasswordListItem = props => {
  const {passwordItemDetails, isShowPassword, deletePassword} = props

  const {
    id,
    url,
    userName,
    password,

    initialContainerBackgroundClassName,
  } = passwordItemDetails

  const onDeletePasswordItem = () => {
    deletePassword(id)
  }

  return (
    <li className="password-list-item-container">
      <p className={`name-logo ${initialContainerBackgroundClassName}`}>
        {userName[0].toUpperCase()}
      </p>
      <div className="url-username-password-card">
        <p className="url">{url}</p>
        <p className="user-name">{userName}</p>
        <p className="password">
          {isShowPassword ? (
            password
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </p>
      </div>
      <button
        className="delete-btn"
        onClick={onDeletePasswordItem}
        type="button"
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordListItem
