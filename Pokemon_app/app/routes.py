from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required
from app import app, db
from app.models import User, Pokemon
from app.forms import LoginForm, RegistrationForm

@app.route('/')
@app.route('/index')
@login_required
def index():
    pokemon = Pokemon.query.all()
    return render_template('pokemon_list.html', pokemon=pokemon)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user)
        return redirect(url_for('index'))

    return render_template('login.html', form=form)
    

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = RegistrationForm()

    if form.is_submitted():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            flash('Username already taken. Please choose a different one.', 'danger')
            return redirect(url_for('register'))

        user = User.query.filter_by(email=form.email.data).first()
        if user:
            flash('Email already taken. Please use a different one.', 'danger')
            return redirect(url_for('register'))
    
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    
    return render_template('register.html', form=form)

    
@app.route('/filter', methods=['POST'])
@login_required
def filter_pokemon():
    color = request.form.get('color')
    if color:
        pokemon = Pokemon.query.filter_by(color=color).all()
    else:
        pokemon = Pokemon.query.all()

    return render_template('pokemon_list.html', pokemon=pokemon)

