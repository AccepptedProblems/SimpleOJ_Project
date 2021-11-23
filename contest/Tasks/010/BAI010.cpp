#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int n, a[maxn];

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    int n;
    cin >> n;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    if(n <= 2)
    {
        cout << "YES";
        return 0;
    }
    int d = a[2] - a[1];
    for(int i=3; i<=n; i++)
        if(a[i] - a[i-1] != d)
        {
            cout << "NO";
            return 0;
        }
    cout << "YES";
}
