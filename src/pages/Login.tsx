import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

export function Login() {
  const { login } = useTasks();
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('Giovanna');
  const [email, setEmail] = useState('giovanna@taskup.app');
  const [password, setPassword] = useState('taskup2026');
  const [error, setError] = useState('');

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || name.trim().length < 2) {
      setError('Por favor, informe seu nome (mínimo 2 caracteres).');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError('Informe um endereço de e-mail válido.');
      emailInputRef.current?.focus();
      return;
    }

    if (password.trim().length < 6) {
      setError('A senha deve possuir no mínimo 6 caracteres.');
      return;
    }

    setError('');
    login(trimmedEmail, name.trim());
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__top">
          <Link to="/" className="login-back-link">
            <ArrowLeft size={15} />
            <span>Voltar para a Home</span>
          </Link>

          <div className="login-brand">
            <div className="sidebar__logo-mark">
              <Sparkles size={19} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="login-brand__title">Entrar no TaskUp</h1>
              <p className="login-brand__subtitle">
                Organize. Priorize. Conclua.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={validateAndSubmit} className="login-form" noValidate>
          {error && (
            <div className="form-alert" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="modal-form__field">
            <label htmlFor="login-name">Nome de exibição</label>
            <div className="input-with-icon">
              <User size={16} className="input-with-icon__svg" />
              <input
                id="login-name"
                type="text"
                placeholder="Ex: Giovanna"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          <div className="modal-form__field">
            <label htmlFor="login-email">E-mail corporativo ou acadêmico</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-with-icon__svg" />
              <input
                ref={emailInputRef}
                id="login-email"
                type="email"
                placeholder="seu.email@taskup.app"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          <div className="modal-form__field">
            <label htmlFor="login-password">Senha de acesso</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-with-icon__svg" />
              <input
                id="login-password"
                type="password"
                placeholder="Mínimo de 6 caracteres"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            <span>Acessar </span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
