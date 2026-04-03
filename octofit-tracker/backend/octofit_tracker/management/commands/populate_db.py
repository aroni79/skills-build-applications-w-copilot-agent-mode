from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create(email='tony@stark.com', name='Iron Man', team=marvel),
            User.objects.create(email='steve@rogers.com', name='Captain America', team=marvel),
            User.objects.create(email='bruce@wayne.com', name='Batman', team=dc),
            User.objects.create(email='clark@kent.com', name='Superman', team=dc),
        ]

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        pushups = Workout.objects.create(name='Pushups', description='Do 20 pushups')
        running = Workout.objects.create(name='Running', description='Run 5km')

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        Activity.objects.create(user=users[0], workout=pushups, date=timezone.now(), duration=10)
        Activity.objects.create(user=users[1], workout=running, date=timezone.now(), duration=30)
        Activity.objects.create(user=users[2], workout=pushups, date=timezone.now(), duration=15)
        Activity.objects.create(user=users[3], workout=running, date=timezone.now(), duration=25)

        self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=80)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
