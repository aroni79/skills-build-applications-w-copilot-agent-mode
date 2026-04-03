from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelSmokeTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

    def test_user_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', name='Test User', team=team)
        self.assertEqual(str(user), 'Test User')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Do pushups')
        self.assertEqual(str(workout), 'Pushups')

    def test_activity_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', name='Test User', team=team)
        workout = Workout.objects.create(name='Pushups', description='Do pushups')
        activity = Activity.objects.create(user=user, workout=workout, date='2023-01-01T00:00:00Z', duration=30)
        self.assertIn('Test User', str(activity))

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Test Team')
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertIn('Test Team', str(leaderboard))
