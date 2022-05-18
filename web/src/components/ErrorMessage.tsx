import './ErrorMessage.css'

export interface IErrorMessageProps {
  message: string
}
export const ErrorMessage = ({ message }: IErrorMessageProps) => (
  <div className="error-message" data-testid="error-message">
    {message}
  </div>
)
