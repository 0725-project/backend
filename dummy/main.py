import requests

base_url = 'http://localhost:3000/api'

def api_call(endpoint, method='GET', data=None, headers=None):
    url = f'{base_url}/{endpoint}'

    if method == 'GET':
        response = requests.get(url, headers=headers)
    elif method == 'POST':
        response = requests.post(url, json=data, headers=headers)
    elif method == 'PUT':
        response = requests.put(url, json=data, headers=headers)
    elif method == 'DELETE':
        response = requests.delete(url, headers=headers)
    else:
        raise ValueError('Invalid HTTP method')

    response.raise_for_status()

    print(f'API Call: {method} {url} => {response.status_code}')
    if not response.content:
        return {}
    return response.json()

if __name__ == '__main__':
    try:
        api_call('health')
    except Exception as e:
        print(f'Error occurred: {e}')
        exit(1)

    # dummy users
    def create_dummy_user(username, nickname, password, email, description):
        user_data = {
            'username': username,
            'nickname': nickname,
            'password': password,
            'email': email,
            'description': description
        }
        create_user_response = api_call('auth/register', method='POST', data=user_data)

        auth_data = {
            'username': username,
            'password': password
        }
        auth_login_response = api_call('auth/login', method='POST', data=auth_data)
        access_token = auth_login_response.get('accessToken')

        return {
            'response': create_user_response,
            'accessToken': access_token 
        }

    foo_response = create_dummy_user('foo', 'Kim Jun Young', 'securePassword1234@', 'normal8781@gmail.com', 'Hello, I am a software developer.')
    john_response = create_dummy_user('john', 'John Mayer', 'q1w2e3r4!@', 'john.mayer@example.com', 'Hello, I am a musician.')
    trump_response = create_dummy_user('trump', 'Donald Trump', 'trump2024!@', 'donald.trump@example.com', 'Hello, I am a businessman.')
    elon_response = create_dummy_user('elon', 'Elon Musk', 'spacex2024!@', 'elon.musk@example.com', 'Hello, I am an entrepreneur.')
    james_response = create_dummy_user('james', 'James Bond', '007!@', 'james.bond@example.com', 'Hello, I am a secret agent.')
    eminem_response = create_dummy_user('eminem', 'Eminem', 'rapGod2024!@', 'eminem@example.com', 'Hello, I am a rapper.')
    freddie_response = create_dummy_user('freddie', 'Freddie Mercury', 'queen1946!@', 'freddie.mercury@example.com', 'Hello, I am a frontman.')
    bar_response = create_dummy_user('bar', 'Barack Obama', 'yeswecan2024!@', 'barack.obama@example.com', 'Hello, I am a former president.')

    # dummy topics
    def create_dummy_topic(topicSlug, topicName, description, user):
        topic_data = {
            'topicSlug': topicSlug,
            'topicName': topicName,
            'description': description
        }
        headers = {
            'Authorization': f'Bearer {user['accessToken']}'
        }
        return api_call('topics', method='POST', data=topic_data, headers=headers)

    create_dummy_topic('programming', 'Programming', 'All about programming.', foo_response)
    create_dummy_topic('music', 'Music', 'Discussion about music.', john_response)
    create_dummy_topic('sports', 'Sports', 'All about sports.', trump_response)
    create_dummy_topic('movies', 'Movies', 'Discussion about movies.', elon_response)
    create_dummy_topic('books', 'Books', 'All about books.', james_response)
    create_dummy_topic('technology', 'Technology', 'Latest trends in technology.', elon_response)
    create_dummy_topic('gaming', 'Gaming', 'Everything about games.', foo_response)
    create_dummy_topic('travel', 'Travel', 'Travel tips and experiences.', james_response)
    create_dummy_topic('food', 'Food', 'Delicious recipes and restaurants.', bar_response)
    create_dummy_topic('science', 'Science', 'Discuss scientific discoveries.', john_response)
    create_dummy_topic('art', 'Art', 'Art and creativity discussions.', freddie_response)
    create_dummy_topic('photography', 'Photography', 'Photography tips and gear.', trump_response)
    create_dummy_topic('history', 'History', 'Discussion on historical events.', eminem_response)
    create_dummy_topic('politics', 'Politics', 'Debates on political topics.', bar_response)
    create_dummy_topic('space', 'Space', 'Exploring the universe.', elon_response)
    create_dummy_topic('finance', 'Finance', 'Money, stocks, and investing.', trump_response)
    create_dummy_topic('health', 'Health', 'Fitness and wellness.', james_response)
    create_dummy_topic('education', 'Education', 'Learning and teaching.', foo_response)
    create_dummy_topic('environment', 'Environment', 'Climate and sustainability.', john_response)
    create_dummy_topic('pets', 'Pets', 'For all pet lovers.', eminem_response)
    create_dummy_topic('cars', 'Cars', 'Automobile news and reviews.', elon_response)
    create_dummy_topic('fashion', 'Fashion', 'Style and trends.', freddie_response)
    create_dummy_topic('photographygear', 'Photography Gear', 'Camera equipment discussions.', trump_response)
    create_dummy_topic('codingtips', 'Coding Tips', 'Share your coding tricks.', foo_response)
    create_dummy_topic('startup', 'Startup', 'Entrepreneurship and startups.', elon_response)

    # dummy posts
    def create_dummy_post(title, content, topicSlug, user):
        post_data = {
            'title': title,
            'content': content,
            'topicSlug': topicSlug
        }
        headers = {
            'Authorization': f'Bearer {user['accessToken']}'
        }
        return api_call('posts', method='POST', data=post_data, headers=headers)


    create_dummy_post('Hello World', 'This is my first post!', 'programming', foo_response) # postId: 1
    create_dummy_post('What\'s your favorite programming language?', 'I really love Python!', 'programming', trump_response) # postId: 2
    create_dummy_post('Let\'s write the Clean Code', 'I think we should follow the SOLID principles.', 'programming', elon_response) # postId: 3
    create_dummy_post('About my Gears..', 'I love my PRS, Fender BlackOne, Dumble Amp, PedalBoard and more.. test', 'music', john_response) # postId: 4
    create_dummy_post('Sports Update', 'The local team won their match!', 'sports', trump_response) # postId: 5
    create_dummy_post('Movie Review', 'I just watched the latest blockbuster.', 'movies', elon_response) # postId: 6
    create_dummy_post('Book Club', 'Let\'s discuss our favorite books.', 'books', james_response) # postId: 7
    create_dummy_post('Rap Battle', 'Who is the best rapper of all time?', 'music', eminem_response) # postId: 8
    create_dummy_post('AI is changing the world', 'Artificial Intelligence is revolutionizing industries.', 'technology', elon_response)  # 9
    create_dummy_post('Best games of 2025', 'Which games are you excited about?', 'gaming', foo_response)  # 10
    create_dummy_post('My trip to Iceland', 'The landscapes were breathtaking.', 'travel', james_response)  # 11
    create_dummy_post('Top 10 pasta recipes', 'Sharing my favorite pasta dishes.', 'food', bar_response)  # 12
    create_dummy_post('Latest Mars Rover discoveries', 'NASA released new photos.', 'space', elon_response)  # 13
    create_dummy_post('Best DSLR for beginners', 'Looking for camera suggestions.', 'photography', trump_response)  # 14
    create_dummy_post('Healthy morning routines', 'Start your day the right way.', 'health', james_response)  # 15
    create_dummy_post('Investing in 2025', 'Where to put your money?', 'finance', trump_response)  # 16
    create_dummy_post('Climate change facts', 'We need urgent action.', 'environment', john_response)  # 17
    create_dummy_post('Caring for your dog', 'Tips for keeping pets healthy.', 'pets', eminem_response)  # 18
    create_dummy_post('Electric cars in 2025', 'Are EVs finally mainstream?', 'cars', elon_response)  # 19
    create_dummy_post('Street fashion trends', 'What’s hot this year?', 'fashion', freddie_response)  # 20
    create_dummy_post('Python tips for beginners', 'Useful shortcuts and tricks.', 'codingtips', foo_response)  # 21
    create_dummy_post('Launching my startup', 'Lessons learned in the first year.', 'startup', elon_response)  # 22
    p23 = create_dummy_post('TypeScript vs JavaScript', 'Pros/cons and migration tips.', 'programming', foo_response)  # 23
    p24 = create_dummy_post('Building REST APIs with NestJS', 'Routing, pipes, guards quickstart.', 'programming', john_response)  # 24
    p25 = create_dummy_post('Best Coding Keyboards in 2025', 'Low-profile vs tactile, QMK/VIA.', 'technology', elon_response)  # 25
    p26 = create_dummy_post('Unreal Engine 6 Highlights', 'Lumen 2.0 and Nanite updates.', 'gaming', trump_response)  # 26
    p27 = create_dummy_post('Seoul Food Tour Guide', 'Hidden gems in Ikseon-dong.', 'travel', james_response)  # 27
    p28 = create_dummy_post('Fermentation Basics', 'Kimchi, kombucha, sourdough at home.', 'food', bar_response)  # 28
    p29 = create_dummy_post('Black Hole Imaging Update', 'Interferometry breakthroughs explained.', 'science', john_response)  # 29
    p30 = create_dummy_post('Watercolor Tips for Beginners', 'Brush control and paper selection.', 'art', freddie_response)  # 30
    p31 = create_dummy_post('Prime vs Zoom Lenses', 'When to choose which and why.', 'photography', trump_response)  # 31
    p32 = create_dummy_post('WWII Maps Worth Studying', 'Operational vs strategic maps.', 'history', eminem_response)  # 32
    p33 = create_dummy_post('Polling Models 101', 'Bayesian vs frequentist approaches.', 'politics', bar_response)  # 33
    p34 = create_dummy_post('Starship Progress Tracker', 'Flight test notes and timelines.', 'space', elon_response)  # 34
    p35 = create_dummy_post('ETF or Individual Stocks?', 'Risk, fees, and tax lots.', 'finance', trump_response)  # 35
    p36 = create_dummy_post('Zone 2 Training Guide', 'Heart rate, mitochondria, sample week.', 'health', james_response)  # 36
    p37 = create_dummy_post('Learning Algorithms Roadmap', 'Greedy, DP, graphs, practice sets.', 'education', foo_response)  # 37
    p38 = create_dummy_post('Zero-Waste Habits', 'Small wins that compound.', 'environment', john_response)  # 38
    p39 = create_dummy_post('Cat Nutrition 101', 'Wet vs dry, taurine myths.', 'pets', eminem_response)  # 39
    p40 = create_dummy_post('Best Home EV Chargers', '11kW vs 7kW, cable management.', 'cars', elon_response)  # 40
    p41 = create_dummy_post('Capsule Wardrobe Guide', 'Silhouette, palette, fabric.', 'fashion', freddie_response)  # 41
    p42 = create_dummy_post('Budget Camera Kits 2025', 'Bodies + primes under $1k.', 'photographygear', trump_response)  # 42
    p43 = create_dummy_post('Must-Have VSCode Extensions', 'Lint, test, Git superpowers.', 'codingtips', foo_response)  # 43
    p44 = create_dummy_post('Bootstrapping Stories', 'What I learned spending $0 on ads.', 'startup', elon_response)  # 44
    p45 = create_dummy_post('Top 10 Iconic Riffs', 'From “Gravity” to classics.', 'music', john_response)  # 45
    p46 = create_dummy_post('Marathon Training (Sub 4h)', 'Base → tempo → taper plan.', 'health', james_response)  # 46
    p47 = create_dummy_post('K-Drama Recommendations', 'Hidden gems beyond blockbusters.', 'movies', foo_response)  # 47
    p48 = create_dummy_post('Underrated Sci-Fi Books', 'Beyond Asimov & Clarke.', 'books', john_response)  # 48
    p49 = create_dummy_post('GraphQL vs REST', 'Trade-offs, caching, schema drift.', 'programming', elon_response)  # 49
    p50 = create_dummy_post('Rust Borrow Checker Tricks', 'Lifetimes, ownership patterns.', 'programming', trump_response)  # 50
    p51 = create_dummy_post('Home Lab Builds 2025', 'Proxmox, ZFS, low-power nodes.', 'technology', foo_response)  # 51
    p52 = create_dummy_post('Pet Photo Thread 📸', 'Share your cutest pet moments!', 'pets', freddie_response)  # 52

    def create_dummy_comment(content, postId, user):
        comment_data = {
            'content': content
        }
        headers = {
            'Authorization': f'Bearer {user['accessToken']}'
        }
        return api_call(f'posts/{postId}/comments', method='POST', data=comment_data, headers=headers)

    def bulk_comments(post_id, items):
        for content, u in items:
            create_dummy_comment(content, post_id, u)

    create_dummy_comment('Great post!', 1, foo_response)
    create_dummy_comment('I totally agree with you.', 2, trump_response)
    create_dummy_comment('This is very insightful.', 3, elon_response)
    create_dummy_comment('Thanks for sharing!', 4, james_response)
    create_dummy_comment('I have a different opinion.', 5, eminem_response)
    create_dummy_comment('AI is fascinating!', 9, john_response)
    create_dummy_comment('I loved The Witcher 4!', 10, trump_response)
    create_dummy_comment('Iceland is on my bucket list.', 11, freddie_response)
    create_dummy_comment('Yummy!', 12, eminem_response)
    create_dummy_comment('Mars looks amazing!', 13, foo_response)
    create_dummy_comment('I recommend the Canon EOS 90D.', 14, james_response)
    create_dummy_comment('Routine is everything.', 15, bar_response)
    create_dummy_comment('I’m investing in renewable energy.', 16, elon_response)
    create_dummy_comment('Agreed, we need change now.', 17, trump_response)
    create_dummy_comment('Dogs are the best!', 18, john_response)
    create_dummy_comment('Tesla Model 3 is great.', 19, foo_response)
    create_dummy_comment('Love the oversized look.', 20, freddie_response)
    create_dummy_comment('Thanks for the Python tips!', 21, james_response)
    create_dummy_comment('Good luck with your startup.', 22, bar_response)

    # dummy post likes
    def create_likes(postId, user):
        headers = {
            'Authorization': f'Bearer {user['accessToken']}'
        }
        return api_call(f'likes/{postId}', method='POST', headers=headers)
    
    def bulk_likes(post_id, users):
        for u in users:
            create_likes(post_id, u)

    create_likes(1, foo_response)
    create_likes(1, trump_response)
    create_likes(1, elon_response)
    create_likes(5, eminem_response)
    create_likes(2, trump_response)
    create_likes(2, bar_response)
    create_likes(3, elon_response)
    create_likes(4, james_response)
    create_likes(5, foo_response)
    create_likes(9, foo_response)
    create_likes(9, john_response)
    create_likes(10, trump_response)
    create_likes(10, elon_response)
    create_likes(11, freddie_response)
    create_likes(12, eminem_response)
    create_likes(13, foo_response)
    create_likes(13, james_response)
    create_likes(14, bar_response)
    create_likes(15, trump_response)
    create_likes(16, elon_response)
    create_likes(17, john_response)
    create_likes(18, eminem_response)
    create_likes(19, foo_response)
    create_likes(20, freddie_response)
    create_likes(21, james_response)
    create_likes(22, elon_response)

    # 23 ~
    bulk_comments(23, [
        ('TS types saved my project.', john_response),
        ('Enums vs union types—what do you prefer?', trump_response),
        ('Use ts-node-dev in dev, esbuild in prod.', elon_response),
    ])
    bulk_likes(23, [foo_response, john_response, elon_response, james_response])

    # 24
    bulk_comments(24, [
        ('Guards + interceptors = 🔥', foo_response),
        ('Swagger setup tips?', james_response),
    ])
    bulk_likes(24, [john_response, foo_response, bar_response])

    # 25
    bulk_comments(25, [
        ('Low-profile is great for wrists.', bar_response),
        ('QMK layers changed my life.', eminem_response),
        ('I still love buckling springs.', freddie_response),
    ])
    bulk_likes(25, [elon_response, trump_response, foo_response, freddie_response])

    # 26
    bulk_comments(26, [
        ('Lumen 2.0 in UE6 is wild.', elon_response),
        ('How’s editor stability?', foo_response),
    ])
    bulk_likes(26, [trump_response, john_response, foo_response])

    # 27
    bulk_comments(27, [
        ('Ikseon-dong dessert spots pls!', freddie_response),
        ('Try cold noodles near Anguk.', john_response),
        ('Map please?', bar_response),
    ])
    bulk_likes(27, [james_response, john_response, freddie_response, bar_response])

    # 28
    bulk_comments(28, [
        ('Sourdough starter name ideas?', eminem_response),
        ('Use 2% salt for kimchi base.', foo_response),
    ])
    bulk_likes(28, [bar_response, foo_response, james_response])

    # 29
    bulk_comments(29, [
        ('Link to the paper?', elon_response),
        ('Great explainer on baselines.', james_response),
    ])
    bulk_likes(29, [john_response, elon_response, trump_response])

    # 30
    bulk_comments(30, [
        ('Cold-press paper changed everything.', freddie_response),
        ('Round vs flat wash brush?', john_response),
    ])
    bulk_likes(30, [freddie_response, john_response])

    # 31
    bulk_comments(31, [
        ('Primes for low light any day.', james_response),
        ('Zooms on travel = convenience.', foo_response),
        ('Sigma 18-35 still king.', eminem_response),
    ])
    bulk_likes(31, [trump_response, foo_response, james_response, eminem_response])

    # 32
    bulk_comments(32, [
        ('Love operational art analyses.', bar_response),
        ('Recommended atlases?', john_response),
    ])
    bulk_likes(32, [eminem_response, john_response, bar_response])

    # 33
    bulk_comments(33, [
        ('Model calibration matters most.', elon_response),
        ('Weighting by recency is tricky.', trump_response),
    ])
    bulk_likes(33, [bar_response, elon_response, trump_response])

    # 34
    bulk_comments(34, [
        ('Heat shield tiles update?', foo_response),
        ('Stage-0 spin stabilization?', james_response),
        ('Flight cadence guesses?', john_response),
    ])
    bulk_likes(34, [elon_response, foo_response, john_response, james_response])

    # 35
    bulk_comments(35, [
        ('ETFs for lazy portfolios.', john_response),
        ('Direct indexing if tax savvy.', elon_response),
    ])
    bulk_likes(35, [trump_response, john_response, elon_response])

    # 36
    bulk_comments(36, [
        ('Zone 2 + sleep = gains.', foo_response),
        ('Polarized training works.', freddie_response),
        ('How to test LT1?', bar_response),
    ])
    bulk_likes(36, [james_response, foo_response, freddie_response, bar_response])

    # 37
    bulk_comments(37, [
        ('DP → graphs → matroid fun.', elon_response),
        ('Practice on AtCoder & CF.', trump_response),
    ])
    bulk_likes(37, [foo_response, elon_response, trump_response])

    # 38
    bulk_comments(38, [
        ('Refill stations are underrated.', john_response),
        ('Repair > replace mindset.', james_response),
    ])
    bulk_likes(38, [john_response, james_response, foo_response])

    # 39
    bulk_comments(39, [
        ('Wet food fixed hairballs for us.', bar_response),
        ('Vet said watch phosphorus.', john_response),
    ])
    bulk_likes(39, [eminem_response, bar_response, john_response, foo_response, james_response])

    # 40
    bulk_comments(40, [
        ('Load balancing tips?', foo_response),
        ('Cable length matters in winter!', trump_response),
    ])
    bulk_likes(40, [elon_response, trump_response, foo_response])

    # 41
    bulk_comments(41, [
        ('Merino tees are clutch.', james_response),
        ('Tailor your pants hem!', freddie_response),
    ])
    bulk_likes(41, [freddie_response, james_response, john_response])

    # 42
    bulk_comments(42, [
        ('Used X-T30 + 35/2 is perfect.', trump_response),
        ('Don’t forget extra batteries.', foo_response),
    ])
    bulk_likes(42, [trump_response, foo_response, eminem_response, bar_response, john_response])

    # 43
    bulk_comments(43, [
        ('GitLens + Error Lens combo.', john_response),
        ('Thunder Client beats Postman for me.', foo_response),
    ])
    bulk_likes(43, [foo_response, john_response, elon_response])

    # 44
    bulk_comments(44, [
        ('Founder-market fit matters.', bar_response),
        ('Ship fast, talk to users.', elon_response),
        ('Congrats on MRR!', james_response),
    ])
    bulk_likes(44, [elon_response, bar_response, james_response, foo_response])

    # 45
    bulk_comments(45, [
        ('That PRS tone though…', foo_response),
        ('Add some Hendrix too!', eminem_response),
    ])
    bulk_likes(45, [john_response, foo_response, eminem_response, freddie_response])

    # 46
    bulk_comments(46, [
        ('Negative splits worked for me.', john_response),
        ('Fuel every 30–40 mins.', elon_response),
    ])
    bulk_likes(46, [james_response, john_response, elon_response])

    # 47
    bulk_comments(47, [
        ('Slice-of-life picks please.', james_response),
        ('OSTs are so good lately.', freddie_response),
    ])
    bulk_likes(47, [foo_response, freddie_response, james_response, elon_response, bar_response, eminem_response])

    # 48
    bulk_comments(48, [
        ('Try “Blindsight”.', trump_response),
        ('Also “The Three-Body Problem”.', elon_response),
    ])
    bulk_likes(48, [john_response, elon_response, trump_response])

    # 49
    bulk_comments(49, [
        ('GraphQL caching is hard.', foo_response),
        ('REST shines for CDN caching.', james_response),
        ('Schema stitching war stories?', john_response),
    ])
    bulk_likes(49, [elon_response, foo_response, james_response, john_response])

    # 50
    bulk_comments(50, [
        ('Use Cow<' 'a> patterns carefully.', foo_response),
        ('Borrow checker is a teacher.', john_response),
    ])
    bulk_likes(50, [trump_response, foo_response, john_response])

    # 51
    bulk_comments(51, [
        ('ZFS snapshots saved me.', bar_response),
        ('iGPU Quick Sync for Plex!', elon_response),
    ])
    bulk_likes(51, [foo_response, bar_response, elon_response])

    # 52
    bulk_comments(52, [
        ('My cat owns this thread.', eminem_response),
        ('Golden retriever here! 🐶', james_response),
        ('I’ll shoot with a nifty fifty.', trump_response),
    ])
    bulk_likes(52, [freddie_response, eminem_response, james_response, trump_response])


    # 개추 주작은 뭐야
    create_dummy_post('개추 주작은 뭐야', '개추 주작은 뭐야', 'programming', foo_response)  # postId: 53
    bulk_comments(53, [
        ('개추', foo_response),
        ('개추', elon_response)
    ])
    bulk_likes(53, [foo_response, elon_response, bar_response, john_response, eminem_response, freddie_response, james_response, trump_response])
