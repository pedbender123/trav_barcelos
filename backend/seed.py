from database import init_db, get_db_connection

def seed_data():
    conn = get_db_connection()
    conn.execute('DROP TABLE IF EXISTS offers')
    conn.close()
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if data exists
    cursor.execute('SELECT count(*) FROM offers')
    if cursor.fetchone()[0] > 0:
        print("Database already seeded.")
        return

    offers = [
        (
            'Maldivas - Tudo Incluído',
            '/images/gallery/beach-1.jpg',
            '7 Dias / 6 Noites',
            '1.200€',
            'Maldivas',
            'Oferta de Verão',
            'Relaxe em bangalôs sobre a água.',
            'Desfrute de uma semana inesquecível nas Maldivas, com hospedagem em bangalôs de luxo sobre as águas cristalinas. O pacote inclui todas as refeições, bebidas, passeios de barco e acesso exclusivo a áreas de mergulho. Perfeito para casais em lua de mel ou quem busca desconexão total.',
            'Taxas de preservação ambiental incluídas. Voo não incluso no pacote base.'
        ),
        (
            'Santorini - Pôr do Sol',
            '/images/gallery/beach-2.jpg',
            '5 Dias / 4 Noites',
            '850€',
            'Grécia',
            '-20% OFF',
            'Vistas deslumbrantes em Santorini.',
            'Explore as ruas brancas e azuis de Oia e Fira. Este roteiro foca nas melhores experiências gastronômicas e visuais da ilha, incluindo um jantar exclusivo ao pôr do sol e visita às vinícolas locais.',
            'Café da manhã incluso. Jantar especial requer reserva antecipada.'
        ),
        (
            'Kyoto - Templo Dourado',
            '/images/gallery/nature-1.jpg',
            '10 Dias / 9 Noites',
            '2.100€',
            'Japão',
            None,
            'Imersão na cultura do Japão antigo.',
            'Uma jornada espiritual e cultural pelos templos sagrados de Kyoto, incluindo o Kinkaku-ji (Pavilhão Dourado). O pacote conta com guia fluente em português, passes de trem bala (JR Pass) e hospedagem em Ryokans tradicionais.',
            'Visto pode ser necessário. Consulte condições para JR Pass.'
        ),
        (
           'Paris - Cidade Luz',
           '/images/gallery/city-1.jpg',
           '4 Dias / 3 Noites',
           '650€',
           'França',
           'Romântico',
           'Charme de Paris, Torre Eiffel e Louvre.',
           'O refúgio romântico perfeito. Inclui subida prioritária à Torre Eiffel, cruzeiro pelo Rio Sena e ingressos para o Museu do Louvre. Hospedagem em hotel boutique no bairro de Le Marais.',
           'City tax paga no hotel. Transfer aeroporto opcional.'
        ),
        (
            'Nova York - Cidade Que Nunca Dorme',
            '/images/gallery/city-2.jpg',
            '6 Dias / 5 Noites',
            '1.500€',
            'EUA',
            None,
            'Times Square, Central Park e Estátua.',
            'Vibre com a energia de NYC. Passeios guiados por Manhattan, Brooklyn e entrada para um show da Broadway à sua escolha. Inclui metrocard para 7 dias ilimitados.',
            'Visto americano obrigatório. Gorjetas não incluídas.'
        ),
         (
            'Bali - Paraíso Tropical',
            '/images/gallery/nature-2.jpg',
            '8 Dias / 7 Noites',
            '1.100€',
            'Indonésia',
            'Aventura',
            'Praias, templos e natureza em Bali.',
            'Conecte-se com a natureza em Ubud e relaxe nas praias de Uluwatu. O pacote inclui aulas de yoga, visita ao templo dos macacos e um dia de spa balinês completo.',
            'Seguro viagem obrigatório para entrada na Indonésia.'
        )
    ]

    cursor.executemany('''
        INSERT INTO offers (title, image, duration, price, location, badge, description_short, description_full, final_considerations)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', offers)

    conn.commit()
    conn.close()
    print("Database seeded successfully.")

if __name__ == '__main__':
    seed_data()
